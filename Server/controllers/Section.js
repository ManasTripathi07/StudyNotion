const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

//Create Section Handler
exports.createSection = async (req,res) => {
    try{
        //Data Fetch
        const {sectionName,courseId} = req.body;

        //Validate
        if(!sectionName || !courseId){
            return res.status(401).json(
                {
                    success:false,
                    message:"Missing Properties!"
                }
            );
        }

        //Create Section
        const newSection = await Section.create({sectionName});

        //Insert the Section in the Course
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent: newSection._id,
                }
            },
            {new:true},
        ).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        
        //Return the response of the insertion
        return res.status(200).json(
            {
                success:true,
                message:"A new Section was created!!",
                updatedCourse,
            }
        )
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Some error occured while Creation of Section",
                error:error.message,
            }
        )
    }
}


//Update Section Handler

exports.updateSection = async (req,res) => {
    try{
        //Fetch the Data
        const {sectionName,sectionId,courseId} = req.body;

        //Validate the Data
        if(!sectionName || !sectionId){
            return res.status(401).json(
                {
                    success:false,
                    message:"Error Occured in the validation of the Section Entries (SectionName and SectionID)",
                }
            );
        }

        //Update the Data (No need to update in the course because the course already contains the section ID)
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //Send the response
        return res.status(200).json(
            {
                success:true,
                message: section,
			    data:course,
            }
        );
    }
    catch(error){
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:"Some error encountered while Updating the Section",
            }
        );
    }
}


//Delete Section Handler function


exports.deleteSection = async (req,res) => {
    try{
        //Get id --Assuming that we are sending the id in params
        const {sectionId,courseId} = req.body;

        //Find by id and delete
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
       
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

        await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();


        //Return the response
        return res.status(200).json(
            {
                success:true,
                message:"Data from Section has been Deleted Successfully!!",
                data:course
            }
        );
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Some Error occured while deleting the Section Data",
            }
        );
    }
}