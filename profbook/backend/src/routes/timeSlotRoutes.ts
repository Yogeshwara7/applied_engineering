import { Router } from "express";
import { createTimeSlot, getAvailableTimeSlots } from "../controllers/timeSlotController";
import { authMiddleware, professorMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, professorMiddleware, createTimeSlot);
router.get("/available", getAvailableTimeSlots);

export default router;
