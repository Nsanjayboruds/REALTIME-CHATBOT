import sendMail from "../middlewares/SendMail.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try{
        const { email } = req.body;
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({
                email,
            });
        }

        const otp = Math.floor(Math.random() * 900000);

        const verifyToken= jwt.sign({user,otp },process.env.Activation_Sec,{
            expiresIn: "5m",
        });

        await sendMail(email,"ChatBot", otp);

        res.json({
            message: "OTP sent to your email",
            verifyToken,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const verifyUser = async(req,res) => {
    try{
       const {otp, verifyToken} = req.body;

       const verify = jwt.verify(verifyToken, process.env.Activation_Sec); 
       if(!verify)
        return res.status(400).json({
    message: "OTP Expired",
});
      if(verify.otp !== otp)
        return res.status(400).json({
            message: "Invalid OTP",
    })

    const token =jwt.sign({_id:verify.user._id},process.env.jWt_sec,{

        expiresIn: "7d",
    });
    res.json({
        message: "Login Successful",
        token,
        user: verify.user,
    });
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export const myProfile = async(req,res) => {
    try{
          const user = await User.findById(req.user._id);
          res.json(user);
    }catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
}

