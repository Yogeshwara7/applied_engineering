import { Request, Response } from "express";
import Appointment from "../models/Appointment";
import TimeSlot from "../models/TimeSlot";

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    
    const { timeSlotId } = req.body;
    const studentId = req.user?.userId;

    if (!timeSlotId) {
      return res.status(400).json({ message: "Time slot ID required" });
    }
    
    const timeSlot = await TimeSlot.findById(timeSlotId);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }
    
    if (timeSlot.isBooked) {
      return res.status(400).json({ message: "Time slot already booked" });
    }
    
    const appointment = await Appointment.create({
      studentId,
      professorId: timeSlot.professorId, 
      timeSlotId,
      status: "confirmed"
    });

    timeSlot.isBooked = true;
    await timeSlot.save();
    
    return res.status(201).json({
      message: "Appointment booked successfully",
      data: appointment
    });
    
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getMyAppointments = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.userId;

    const appointments = await Appointment.find({ studentId })
      .populate("professorId", "name email")
      .populate("timeSlotId", "startTime endTime")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const professorId = req.user?.userId;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.professorId.toString() !== professorId) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    const timeSlot = await TimeSlot.findById(appointment.timeSlotId);
    if (timeSlot) {
      timeSlot.isBooked = false;
      await timeSlot.save();
    }

    return res.status(200).json({
      message: "Appointment cancelled successfully",
      data: appointment
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};