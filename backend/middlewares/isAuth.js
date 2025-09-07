import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
    try{
        const token = req.headers.token;
        if(!token) return res.status(400).json({
            message : "Login First",
        });

        const decode =jwt.verify(token,process.env.jWt_sec);

        req.user =await User.findById(decode._id);
        next();
    }catch(error){
        res.status(500).json({message: "Login First"});
    }
}