/** @format */

import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Check if auth object exists
    if (!req.auth || !req.auth.clerkId) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed - No Clerk session found",
      });
    }

    const { clerkId } = req.auth;

    // Find user in database
    const user = await User.findOne({ clerkId }).select("-__v");

    if (!user) {
      // Log the failed lookup attempt
      console.error(`User lookup failed for clerkId: ${clerkId}`);
      return res.status(404).json({
        success: false,
        message: "User not found in database. Please try logging in again.",
        error: "USER_NOT_SYNCED",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};
