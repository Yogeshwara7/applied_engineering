import { createBooking } from "../controllers/bookingController";
import { getbookings } from "../controllers/bookingController";
import {cancelbookings} from "../controllers/bookingController";
import { Router } from "express";

const router = Router();

router.post("/",createBooking);
router.get("/", getbookings);
router.put("/cancel/:id" , cancelbookings)
export default router;