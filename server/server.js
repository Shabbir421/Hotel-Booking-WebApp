/** @format */
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hoterRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();
//! port
const PORT = process.env.PORT || 5000;
app.use(cors());

//! api to listen to webhooks cleark

//! Middlewares
app.use(express.json());
app.post("/api/clerk", clerkWebhooks);
app.use(clerkMiddleware());

//! Routes
app.get("/", (req, res) => {
  res.send("Hello, bhai!");
});
app.use("/api/user", userRouter);
app.use("/api/hotels", hoterRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server running on port ${PORT}`);
});
