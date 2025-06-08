const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
//ResetPasswordToken -> send email from forntend ## would be dealed later
exports.resetPasswordToken = async (req,res) => {
    try{
        //Input -> email get request from req body
        const email = req.body.email;

        //Validate the email 
        const user = await User.findOne({email:email});
        if(!user){
            return response.status(403).json(
                {
                    success:false,
                    message:"Your email is not registered"
                }
            )
        }


        //Generate the token
        const token = crypto.randomBytes(20).toString("hex");

        //Update the user by adding the token and the expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email},{
            token:token,
            resentPasswordExpires:Date.now() + 3600000,
        },{new:true});


        //Generate the link
        //Frontend_PORT = 3000
        //Backend_ PORT = 4000
        const url = `http://localhost:3000/update-password/${token}`;  //Front end link created for the password change UI


        //Send mail containing the url
        await mailSender(email,"Password Update Link",`Password Reset Link: ${url} Click this url inorder to change your password`);

        //Return Response
        return res.status(200).json(
            {
                success:true,
                message:"Email Sent Successfully Please check the email and change the password accordingly",
            }
        );
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Some Error occured while Generating the Reset Password Web Token",
                error:error.message,
            }
        )
    }
}

//ResetPassword -> DB me Password update

exports.resetPassword = async (req,res) => {
    try{
        //Data Fetch
        const {password,confirmPassword,token} = req.body;   //Front end placed the token data in the request body we didnt fetch it from anywhere

        //Validation
        if(password != confirmPassword){
            return res.status(403).json(
                {
                    success:false,
                    message:"The Passwords Entered Donot Match!",
                }
            );
        }

        //Get user details 
        const userData = await User.findOne({token:token});

        //If no Entry -> Invalid token 
        if(!userData){
            return res.status(403).json(
                {
                    success:false,
                    message:"Token is Invalid",
                }
            );
        }

        //Token Time expiration
        if(userData.resentPasswordExpires < Date.now()){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token has Expired, Please Regenerate the Token",
                }
            );
        }

        //Hash the Password
        const hashedPassword = await bcrypt.hash(password,10);

        //Update the Password 
        await User.findOneAndUpdate({token:token},{
            password:hashedPassword
        },{new:true});                         //New:true returns the new updated document 
        //Return the response
        return res.status(200).json(
            {
                success:true,
                message:"Password is successfully Reset!",
                userDetails:userData,
            }
        );
    }
    catch(error){
        return res.status(500).json(
            {
                success:false,
                message:"Some error encountered while Completing the reset Password Request!",
                error:error.message,
            }
        );
    }

}