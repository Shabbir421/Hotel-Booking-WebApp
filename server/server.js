/** @format */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
dotenv.config();
const app = express();

//! port
const PORT = process.env.PORT || 5000;

//! Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//! api to listen to webhooks cleark
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("Hello, bhai!");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
