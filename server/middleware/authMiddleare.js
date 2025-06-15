import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  const auth = getAuth(req); // Properly get Clerk auth

  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "Unauthorized - No Clerk session" });
  }

  try {
    // Find user in DB using Clerk ID
    const user = await User.findOne({ clerkId: auth.userId }).select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protect middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
