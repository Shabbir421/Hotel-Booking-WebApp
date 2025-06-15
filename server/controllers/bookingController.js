/** @format */

import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// function to check room availability

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate, $gte: checkInDate },
      checkOutDate: { $gte: checkInDate, $lte: checkOutDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.error("Error checking room availability:", error);
    throw new Error("Internal server error");
  }
};

//api to check room availability
//post /api/booking/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, room } = req.body;

    if (!checkInDate || !checkOutDate || !room) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const isAvailable = await checkAvailability({
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      room,
    });
    return res.status(200).json({ success: true, isAvailable });
  } catch (error) {
    console.error("Error checking availability:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function to create a booking
// post /api/booking/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    //before creating a booking, check if the room is available
    const isAvailable = await checkAvailability({
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      room,
    });

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "Room is not available for the selected dates" });
    }

    //get total price from the room model
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;
    // Calculate total price based on the number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timediff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timediff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = new Booking({
      user,
      hotel: roomData.hotel._id,
      room,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice,
      guests,
      paymentMethod: "Pay at Hotel",
    });

    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// api to get all bookings for a user
// get /api/booking/user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get hotel bookings
// get /api/booking/hotel/:hotel
export const getHotelBookings = async (req, res) => {
  try {
    Hotel;
    const hotel = await Hotel.findById({ owner: req.auth.userId });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    // total bookings
    const totalBookings = bookings.length;
    //total revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    return res.status(200).json({
      success: true,
      dashbourdData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
