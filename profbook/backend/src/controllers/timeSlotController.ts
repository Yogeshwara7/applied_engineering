import { Request, Response } from "express";
import TimeSlot from "../models/TimeSlot";

export const createTimeSlot = async (req: Request, res: Response) => {
  try {

    const { startTime, endTime } = req.body;
    
    if (!startTime || !endTime) {
        return res.status(400).json({ message: "Start time and end time are required" });
    }
    const professorId = req.user?.userId;
    
    if(!professorId){
        return res.status(400).json({message:"professor login required"})
    }
    

    const now = new Date();
    const start = new Date(startTime);
    if (start < now) {
        return res.status(400).json({ message: "Start time must be in the future" });
    }

    const end = new Date(endTime);
    if (end <= start) {
        return res.status(400).json({ message: "End time must be after start time" });
    }

    const newSlot = await TimeSlot.create({
        professorId: professorId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
    });
    
    
    return res.status(201).json({
        success: true,
        message: "Time slot created successfully",
        data: newSlot,
    });
            
  } catch (error) {
    return res.status(500).json({message:"Internal error", error});
  }
};

export const getAvailableTimeSlots = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.query;
    
    const query: any = { isBooked: false };
    if (professorId) {
      query.professorId = professorId;
    }
    
    const slots = await TimeSlot.find(query)
      .populate("professorId", "name email")  
      .sort({ startTime: 1 });
    
    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    });
    
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
