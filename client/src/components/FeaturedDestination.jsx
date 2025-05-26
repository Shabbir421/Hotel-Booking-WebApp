import React from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import Title from "./Title";
import { Link, useNavigate } from "react-router-dom";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <Title
        title="Featured Destinations"
        subtitle="Explore our top picks for your next adventure"
        align="center"
        titleFont="font-extrabold text-blue-700"
        subtitleFont="text-gray-400 italic"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <div
            key={room._id || index}
            onClick={() => navigate(`/rooms/${room._id}`)}
            className="cursor-pointer"
          >
            <HotelCard room={room} index={index} />
          </div>
        ))}
      </div>
      {/* View All Destinations Button */}
      <div className="mt-8 text-center">
        <Link
          to="/hotels"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          View All Destinations
        </Link>
      </div>
    </div>
  );
};

export default FeaturedDestination;