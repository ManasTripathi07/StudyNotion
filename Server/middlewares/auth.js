const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


//auth
exports.auth = async (req,res,next) => {
    try{
        //Extract Token 
        const token  = req?.cookies?.token || req?.body?.token || req.header("Authorization").replace("Bearer ", "");
        

        //If token is missing then return the response
        if(!token){
            return res.status(401).json(
                {
                    succcess:false,
                    message:"Token is Missing!",
                }
            );
        }

        //Verify the token based on the Secret key
        console.log("Logging before try internal");
        try{
            console.log("Logging inside try internal");
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            //Facing some verification issues
            return res.status(401).json(
                {
                    success:false,
                    message:"Sent Token is Invalid!",
                }
            );
        }
        next();   //Going to the next middleware
    }
    catch(error){
        console.error(error);
        return res.status(401).json(
            {
                success:false,
                message:"Some error is Encountered while the Authentication of the User",
            }
        )
    }
}

//isStudent
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is the protected Route for the Students only",
                }
            )
        }
        next();
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Student Role Cannot be Verified!",
            }
        )
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is the protected Route for the Instructors only",
                }
            )
        }
        next();
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Instructor Role Cannot be Verified!",
            }
        )
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is the protected Route for the Admin only",
                    error:error.message,
                }
            )
        }
        next();
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Admin Role Cannot be Verified!",
                error:error.message,
            }
        )
    }
}

