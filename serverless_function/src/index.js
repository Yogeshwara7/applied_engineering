import * as admin from "firebase-admin";
import * as functions  from "firebase-functions";
import { z } from "zod";
import cors from "cors";
import express from "express";

admin.initializeApp();
const db=admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const feedbackSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string().min(10)
});

const recentreq =new Map();

app.post("/feedback", async(req,res)=>{
    try{
        const ip=req.ip;
        const date=Date.now();
        if(recentreq.has(ip) && date-recentreq.get(ip)<10000){
            return res.status(429).json({
                error:"too many req"
            });
        }
        recentreq.set(ip,date);
        const data = feedbackSchema.parse(req.body);
        const docref = await db.collection("feedback").add({
            ...data,
            createdAt:admin.firestore.FieldValue.serverTimestamp()
        });
        return res.status(201).json({
            message: "feedback stored",
            id: docref.id
        });
    }
    catch(err){
        if(err.name === "ZodError"){
            return res.status(400).json({
                err: err.errors
            });
        }
        console.error(err);
        return res.status(500).json({
            error: "Internal server error"
        });

    }
});

export const api = functions.https.onRequest(app);