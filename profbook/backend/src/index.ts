import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { error } from "node:console";


const app=express();
app.use(express.json());
app.use(cors());

async function server() {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");

        app.get("/", (req,res)=>{
            res.json({message:"ProfBook API is running"})
        })
        app.listen(process.env.PORT, ()=>{
        console.log("Server started");
    })
    }
    catch(error){
        console.error("MongoDB connection error", error);
        process.exit(1);
    }

}

server();