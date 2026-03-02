import { Schema, model } from "mongoose";

const appointmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  professorId: {
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  timeSlotId: {
    type:Schema.Types.ObjectId,
    ref:"Timeslot",
    required:true
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed"
  }
}, {
  timestamps: true
});

const Appointment = model("Appointment", appointmentSchema);
export default Appointment;
