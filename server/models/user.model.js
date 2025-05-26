/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "hotelOwner", "admin"],
      default: "user",
    },
    recentSearcheCities: [
      {
        type: String,
        required: true,
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
// This code defines a Mongoose schema for a User model in a Node.js application.
