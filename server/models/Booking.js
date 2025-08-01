/** @format */

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    hotel: {
      type: String,
      ref: "Hotel",
      required: true,
    },
    room: {
      type: String,
      ref: "Room",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "Pay at Hotel",
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
