/** @format */

import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id; // Assuming the owner is the logged-in user

    const hotel = await Hotel.findOne({ owner });
    // Check if the hotel already exists for the owner
    if (hotel) {
      return res.status(400).json({ message: "Hotel already registered" });
    }

    // Validate required fields
    if (!name || !address || !contact || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new hotel instance
    await Hotel.create({
      name,
      address,
      contact,
      city,
      owner, // Associate the hotel with the owner
    });

    // Save the hotel to the database
    await User.findByIdAndUpdate(owner, {
      role: "owner", // Update user role to hotelOwner
    });

    res.status(201).json({ success: true, hotel: { name, address, contact, city } });
  } catch (error) {
    console.error("Error registering hotel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
