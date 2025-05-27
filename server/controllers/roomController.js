/** @format */

import Hotel from "../models/Hotel.js";

//! api to create a room

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel =await Hotel.findOne({owner: req.auth.userId});
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found for this owner" });
    }
    
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to get all rooms of a hotel
export const getRooms = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const rooms = await Room.find({ hotel: hotelId }).populate("hotel", "name");

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this hotel" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to get a room specific room
export const getOwnerRooms = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const rooms = await Room.find({ owner: ownerId }).populate("hotel", "name");

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this owner" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching owner's rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//! api to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.isAvailable = !room.isAvailable;
    await room.save();

    res
      .status(200)
      .json({ message: "Room availability toggled successfully", room });
  } catch (error) {
    console.error("Error toggling room availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
