const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//For Multiple Payments


//initiate the razorpay order
exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try{
           
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //Enroll the Students if the Signature Verification is successfull
            await enrollStudents(courses, userId, res);
            //return Response 
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos:[],
        });

        console.log("Course Progress is-> ",courseProgress);

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress:courseProgress._id,
            }},{new:true})
            
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}































//For Single Payment Captures

// //Capture the Payment and Initiate the Razorpay Order
// exports.capturePayment = async (req,res) => {
//     try{
//         //Get userID and the CourseID
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         //Validation of the data
//         if(!course_id){
//             return res.status(401).json(
//                 {
//                     success:false,
//                     message:"CourseID Validation Failed, Please provide a valid CourseID!",
//                 }
//             );
//         }

//         //Validation of course details or not via the id fetched
//         let course;    ///Try catch block is used because the database call is done here..
//         try{
//             course = await Course.findById(course_id);

//             //ReValidation
//             if(!course){
//                 return res.status(401).json(
//                     {
//                         success:false,
//                         message:"Could not find the Course!",
//                     }
//                 );
//             }

//             //Check if the user has already paid for the course or not
//             const uid = new mongooose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(403).json(
//                     {
//                         success:false,
//                         message:"Student is already Enrolled!!",
//                         error:errorMonitor.message,
//                     }
//                 );
//             }
//         }
//         catch(error){
//             console.error(error);
//             return res.status(500).json(
//                 {
//                     success:false,
//                     message:error.message,
//                 }
//             );
//         }

//         //Create the order
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId: course_id,
//                 userId,
//             },
//         }

//         //Function call -> DB Call
//         try{
//             //Initiate the payment using Razorpay
//             const paymentResponse =  await instance.orders.create(options);
//             cosnole.log(paymentResponse);

//             return res.status(200).json(
//                 {
//                     success:true,
//                     message:"Payment intiation was successfull!",
//                     courseName:course.courseName,
//                     courseDescription:course.courseDescription,
//                     thumbnail: course.thumbnail,
//                     orderId:paymentResponse.id,
//                     currency:paymentResponse.currency,
//                     amount:paymentResponse.amount,
//                 }
//             );
//         }
//         catch(error){
//             console.log(error);
//             return res.status(402).json(
//                 {
//                     success:false,
//                     message:error.message,
//                 }
//             )
//         }
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Some Unexpected Error encountered while Initiation of the Razorpay Payment!",
//                 error:error.message,
//             }
//         );
//     }
// };

// //Verify the Signatures of Razorpay and Server

// exports.verifySignature = async (req,res) => {
//     try{
//         const webhookSecret = "12345678";
//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256",webhookSecret);
//         shasum.update(JSON.stringify(req.body));

//         const digest = shasum.digest("hex");    //This is used for the conversion of the response into hexadecimal format


//         if(signature === digest){
//             console.log("Payment Authorised!");

//             //Req is now from the RazorPay UI hence it would not contain the instances of the userID and courseID
//             //hence we have passed the course and user id as notes in the response sent by the payment 

//             const {courseId,userId} = req.body.payload.payment.entity.notes;

//             try{
//                 //Fullfilling the action
//                 //find the course and enroll the student in the course
//                 const enrolledCourse = await  Course.findOneAndUpdate(
//                     {_id:courseId},
//                     {
//                         $push:{
//                             studentsEnrolled:userId,
//                         }
//                     },
//                     {new:true}
//                 );

//                 if(!enrolledCourse){
//                     return res.status(500).json(
//                         {
//                             success:false,
//                             message:"Course not Found!!",
//                         }
//                     )
//                 }

//                 console.log(enrolledCourse);

//                 //Find the student and add the course he has done payment to in his list of enrolled courses
//                 const enrolledStudent = await User.findOneAndUpdate(
//                     {_id:userId},
//                     {$push:{courses:courseId}},
//                     {new:true}
//                 );

//                 console.log(enrolledStudent);

//                 //Send Confirmation MAIL to the Student
//                 const emailResponse = await mailSender(
//                     enrolledStudent.email,
//                     "Congratulation from MKStudios",
//                     "Congratulations, you have successfully enrolled in a new Course"
//                 );

//                 console.log(emailResponse);

//                 return res.status(200).json(
//                     {
//                         success:true,
//                         message:"Signature Verified and the Course Successfully Added!!",
//                     }
//                 );

//             }
//             catch(error){
//                 console.log(error);
//                 return res.status(403).json(
//                     {
//                         success:false,
//                         message:"Some error occured during the validation of the Signature or the Addition of the Course!",
//                         error:error.message,
//                     }
//                 )
//             }
//         }

//         else{
//             return res.status(401).json(
//                 {
//                     success:false,
//                     message:"Invalid Request!!",
//                 }
//             );
//         }
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Some unexpected error occured during the verification of the Signatures",
//                 error:error.message,
//             }
//         );
//     }
// }