import { Router } from "express";
import { bookAppointment, getMyAppointments, cancelAppointment } from "../controllers/appointmentController";
import { authMiddleware, professorMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, bookAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.delete("/:appointmentId", authMiddleware, professorMiddleware, cancelAppointment);

export default router;
