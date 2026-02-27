import { createBooking } from "../controllers/bookingController";
import { getbookings } from "../controllers/bookingController";
import { Router } from "express";

const router = Router();

router.post("/",createBooking);
router.get("/", getbookings);

export default router;