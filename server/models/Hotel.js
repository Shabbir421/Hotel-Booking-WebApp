/** @format */

import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
