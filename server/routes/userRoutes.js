/** @format */

import express from "express";
import { protect } from "../middleware/authMiddleare.js";
import {
  getUserData,
  storeRecentSearchedCity,
} from "../controllers/userController.js";

const userRouter = express.Router();

//! Route to get user data
userRouter.get("/",  getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCity);

export default userRouter;
