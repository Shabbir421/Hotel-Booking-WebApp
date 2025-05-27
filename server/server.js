/** @format */
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import userRouter from "./routes/userRoutes.js";
// import hoterRouter from "./routes/hotelRoutes.js";

const app = express();
app.use(cors());

//! port
const PORT = process.env.PORT || 5000;
//! api to listen to webhooks cleark

//! Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/clerk", clerkWebhooks);

//! Routes
app.get("/", (req, res) => {
  res.send("Hello, bhai!");
});
// app.use("/api/user", userRouter);
// app.use("/api/hotels", hoterRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
