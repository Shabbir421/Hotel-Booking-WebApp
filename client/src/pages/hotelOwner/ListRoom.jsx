/** @format */

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  // Fetch rooms data from backend
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setRooms(data.rooms);
    } catch (error) {
      toast.error("Failed to fetch rooms. Please try again later.");
      console.error("Fetch Rooms Error:", error);
    }
  };

  // Load rooms when user is available
  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  // Toggle room availability
  const toggleAvailability = async (index) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[index];
    const newAvailability = !room.isAvailable;

    try {
      await axios.patch(
        `/api/rooms/toggle-availability`,
        { roomId: room._id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      room.isAvailable = newAvailability;
      setRooms(updatedRooms);
      toast.success("Room availability updated.");
    } catch (error) {
      toast.error("Failed to update room availability.");
      console.error("Toggle Error:", error);
    }
  };

  return (
    <div className="px-3 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Room Listings</h1>

      {/* Description */}
      <p className="text-gray-600">
        Manage all the rooms you’ve added. Enable or disable them with a toggle.
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Room Name</th>
              <th className="px-4 py-3">Facilities</th>
              <th className="px-4 py-3">Price / Night</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rooms.map((room, index) => (
              <tr key={room._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{room.roomType}</td>
                <td className="px-4 py-3">
                  <ul className="list-disc pl-5 space-y-1">
                    {room.amenities?.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  ${room.pricePerNight}
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.isAvailable}
                      onChange={() => toggleAvailability(index)}
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition duration-300 peer-focus:ring-2 peer-focus:ring-blue-400 relative">
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
