/** @format */

import express from "express";
import { protect } from "../middleware/authMiddleare.js";
import { registerHotel } from "../controllers/hotelController.js";

const hoterRouter = express.Router();

hoterRouter.post("/", protect, registerHotel);

export default hoterRouter;
