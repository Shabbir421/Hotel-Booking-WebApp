/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col group border border-gray-100">
      {/* Image section */}
      <div className="relative h-48 w-full">
        <img
          src={room.images?.[0]}
          alt={room.hotel?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow">
          Best Seller
        </span>
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1 truncate text-center">
          {room.hotel?.name}
        </h3>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span className="truncate">{room.hotel?.address}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center mb-2">
          <img src={assets.starIconFilled} alt="rating" className="w-4 h-4" />
          <span className="ml-1 font-medium text-sm">{room.rating}</span>
          <span className="ml-2 text-gray-400 text-xs">
            ({room.reviews} reviews)
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-600 font-bold text-lg">
            ${room.pricePerNight}/
            <span className="text-sm font-normal">night</span>
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
