const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
// const mongoose = require("mongoose");
//createRating
// exports.createRating = async (req,res) => {
//     try{
//         console.log("Inside the try Block");
//         //Data fetch from the req body
//         const userId = req.user.id;

//         //Fetch data from req body
//         const {rating,review,courseId} = req.body;

//         console.log("The userId extracted froim the req body is",userId);

//         //Validate if the user is enrolled or not
//         const courseDetails = await Course.findOne(
//             {_id:courseId,studentEnrolled:{$elemMatch:{$eq:userId}}},
//         );

//         if(!courseDetails){
//             return res.status(403).json(
//                 {
//                     success:false,
//                     message:"Student is not enrolled in the Course",
//                     error:error.message,
//                 }
//             )
//         }

//         //check if user has already reviewed the course
//         const alreadyReviewed = await RatingAndReview.findOne(
//             {
//                 user:userId,
//                 course:courseId,
//             }
//         );

//         if(alreadyReviewed){
//             return res.status(401).json(
//                 {
//                     success:false,
//                     message:"Course is already Reviewed by the user!",
//                 }
//             );
//         }

//         //create rating and review
//         const ratingReview = await RatingAndReview.create(
//             {
//                 rating,
//                 review, 
//                 course:courseId,
//                 user:userId,
//             }
//         );

//         //update the Course with the created Rating and Review
//         const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
//             {
//                 $push: {
//                     ratingAndReviews:ratingReview._id,
//                 }
//             },
//             {new:true}
//         );
//         console.log(updatedCourseDetails);

//         //Return the Response
//         return res.status(200).json(
//             {
//                 success:true,
//                 message:"Rating and Review Created Successfully!",
//                 ratingReview,
//             }
//         );
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json(
//             {
//                 success:false,
//                 message:"Some Unexpected Error occured during the creation of Rating and Review",
//                 error:error.message,
//             }
//         );
//     }
// }


exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, review, courseId } = req.body

    // Check if the user is enrolled in the course

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    })


    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      })
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      })
    }

    // Create a new rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    })

    // Add the rating and review to the course
    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    })
    await courseDetails.save()

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


//getAverageRating {Aggregation of the queries}
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}

//TODO:HW Write the function to implement all rating of some course specific ratings
// exports.getAllRating = async (req, res) => {
//     try{
//             const allReviews = await RatingAndReview.find({})
//                                     .sort({rating: "desc"})
//                                     .populate({
//                                         path:"user",
//                                         select:"firstName lastName email image",
//                                     })
//                                     .populate({
//                                         path:"course",
//                                         select: "courseName",
//                                     })
//                                     .exec();
//             return res.status(200).json({
//                 success:true,
//                 message:"All reviews fetched successfully",
//                 data:allReviews,
//             });
//     }   
//     catch(error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     } 
// }