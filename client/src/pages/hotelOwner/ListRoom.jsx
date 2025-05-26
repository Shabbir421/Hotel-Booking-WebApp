/** @format */

import React, { useState } from "react";

const ListRoom = () => {
  const [rooms, setRooms] = useState([
    {
      name: "Deluxe Suite",
      facilities: ["Free WiFi", "Room Service", "Mountain View"],
      price: 180,
      active: true,
    },
    {
      name: "Ocean View Room",
      facilities: ["Pool Access", "Free Breakfast", "Room Service"],
      price: 220,
      active: false,
    },
    {
      name: "Executive Suite",
      facilities: ["Free WiFi", "Mountain View", "Room Service"],
      price: 300,
      active: true,
    },
  ]);

  const toggleRoomStatus = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].active = !updatedRooms[index].active;
    setRooms(updatedRooms);
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
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{room.name}</td>
                <td className="px-4 py-3">
                  <ul className="list-disc pl-5 space-y-1">
                    {room.facilities.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  ${room.price}
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.active}
                      onChange={() => toggleRoomStatus(index)}
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition duration-300 peer-focus:ring-2 peer-focus:ring-blue-400">
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
