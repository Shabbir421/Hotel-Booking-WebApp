/** @format */

import express from "express";
import {
  getUserBookings,
  createBooking,
  checkAvailabilityAPI,
  getHotelBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleare.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.get("/user", protect, getUserBookings);

export default bookingRouter;       
