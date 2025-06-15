/** @format */

import { json, response } from "express";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

//! api to create a room

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res
        .status(404)
        .json({ message: "Hotel not found for this owner" });
    }
    // upload image to cloudinary
    const uploadedImagePromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "rooms",
      });
      return result.secure_url;
    });

    //wait for all images to be uploaded
    const images = await Promise.all(uploadedImagePromises);
    console.log(images);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res
      .status(201)
      .json({ success: true, message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to get all rooms of a hotel
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: " image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to get a room specific room
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({
      owner: req.user._id,
    });
    const rooms = await Room.find({ Hotel: hotelData._id.toString() }).populate(
      "hotel"
    );

    res.json({
      success: true,
      message: "Owner's rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    console.error("Error fetching owner's rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.status(200).json({ message: "Room availability updated successfully" });
  } catch (error) {
    console.error("Error toggling room availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
