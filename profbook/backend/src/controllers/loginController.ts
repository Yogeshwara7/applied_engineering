import { Response , Request } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async ( req: Request , res: Response) =>{
    try{
        const{email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"email and password required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"user does not exist"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(401).json({message:"password does not match"});
        }

        const token = jwt.sign(
            {userId:user._id , role:user.role}, process.env.JWT_SECRET as string,{expiresIn :"24h"}
        );

        return res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                role:user.role
            }
        });
    }
    catch(error){
        return res.status(500).json({message:"Internal server Error", error});
    }
}

