import { Response, Request } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const {email , password , name, role} = req.body;

    if(!email || !password || !name || !role){
        return res.status(400).json({message: "ALL fields are required"});
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }

    const user= await User.create({email , password , name, role});

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name,
            role:user.role
        }
    });
  } catch (error) {
    return res.status(500).json({message:"Internal Server error", error});

  }
};
