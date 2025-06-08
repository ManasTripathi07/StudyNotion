const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress")
const mongoose = require("mongoose")
const Course = require("../models/Course")

//Update Profile Handler Function
exports.updateProfile = async (req,res) => {
    try{
        //Authentication middle ware -> use id present
        //Get data from the req body
        console.log("Logging the req header for formatings",req);
        const  {firstName,lastName,dateOfBirth="",about="",contactNumber,gender} = req.body;
        // console.log(firstName,lastName,image,dateOfBirth="",about="",contactNumber,gender);
        

        //Get userId
        const id = req.user.id;   //This is written inside the authentication middleware code during the login time the payload is created which has id

        //Data Validation
        if(!contactNumber || !gender || !id){
            return res.status(401).json(
                {
                    success:false,
                    message:"All fields are required for Validating the data of Update Profile!",
                }
            );
        }

        //Find the profile
        const userDetails = await User.findById(id);
        // const profileId = userDetails.additionalDetails;
        const profile = await Profile.findById(userDetails.additionalDetails);
        

        //Update the profile  {here we have not done the data updation in the database because the data updation in the database can be done 
        // in two ways this is the second method where we update the data in the individual fetched object and then save its entry}
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.gender= gender;
        profile.contactNumber = contactNumber;
        profile.firstName = firstName;
        profile.lastName = lastName,

       
        

        await profile.save();

        const updatedUser = await User.findById(id).populate("additionalDetails").exec();

        //Return the response
        return res.status(200).json(
            {
                success:true,
                message:"Profile Updated Successfully",
                updatedUserDetails: updatedUser,
            }
        );
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Some Unexpected error encountered while Updating the profile",
                error:error.message,
            }
        );
    }
}

//Delete Account Handler Function

exports.deleteAccount = async (req,res) => {
    try{
        //Get the id from the req body
        const id = req.user.id;

        //Validate the details
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res(404).json(
                {
                    success:false,
                    message:"User not found!!",
                }
            );
        }

        //Delete the profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //Delete the User
        await User.findByIdAndDelete({_id:id});

        //TODO: Unenroll the delted user from all the enrolled courses of his profile

        //Return the response
        return res.status(200).json(
            {
                success:true,
                message:"Account Deleted Successfully!",
            }
        );
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Some error encountered while deleting the Account",
                error:error.message,
            }
        );
    }
}


//Get all User Details Handler function

exports.getAllUserDetails = async (req,res) => {
    try{
        //Fetch the id
        const id = req.user.id;

        //Fetch the UserDetails
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        //Validate the id
        if(!userDetails){
            return res.status(401).json(
                {
                    success:false,
                    message:"User Details not found!!",
                }
            );
        }

        //Do the db call with the fetched and validated id and fetch all the details from the db
        //Return the response
        return res.status(200).json(
            {
                success:true,
                message:"User Data Fetched Successfully!!",
                userDetails,
            }
        );
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Some Unexpected Error encountered while fetching the all the User Details",
                error:error.message,
            }
        );
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
     userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error })
  }
}



