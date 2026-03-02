import { Schema, model } from "mongoose";

const timeSlotSchema = new Schema({
  professorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startTime: {
    type:Date,
    required:true,

  },
  endTime: {
    type:Date,
    required:true,

  },
  isBooked:{
    type:Boolean,
    default:false
  }
});


const TimeSlot = model("TimeSlot", timeSlotSchema);
export default TimeSlot;
