/** @format */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedRoom = roomsDummyData.find((room) => room._id === id);
    if (fetchedRoom) {
      setRoom(fetchedRoom);
      setMainImage(fetchedRoom.images?.[0] || assets.defaultRoomImage);
    }
  }, [id]);

  if (!room) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Room Not Found</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      <button
        className="mb-6 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}>
        ← Back to Rooms
      </button>
      <div className=" flex-col lg:flex-row gap-8 w-full">
        {/* Left Side: Info & Images */}
        <div className="flex-1 min-w-0">
          {/* Name, Bed Type, Offer */}
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h2 className="text-2xl font-bold">{room.hotel?.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-medium">
                {room.roomType}
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                20% off
              </span>
            </div>
          </div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={room.rating} />
            <span className="text-gray-600">{room.rating} / 5</span>
            <span className="text-gray-400">({room.reviews} reviews)</span>
          </div>
          {/* Address */}
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <img src={assets.locationIcon} alt="" className="w-4 h-4 mr-1" />
            <span>{room.hotel?.address}</span>
          </div>
          {/* Images */}
          <div className="mb-6 max-w-6xl flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              {/* Main Image */}
              <img
                src={mainImage}
                alt={room.hotel?.name}
                className="w-full h-82 object-cover  rounded-lg"
                style={{ maxWidth: "600px" }}
              />
              {/* Thumbnails on the left */}
              {room.images?.length > 1 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 mr-4">
                  {room.images.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Room ${idx + 1}`}
                      className={`w-80 h-40 object-cover rounded cursor-pointer border-3 ${
                        mainImage === img
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mb-6 max-w-5xl flex justify-between items-center">
            <h3 className="text-lg font-semibold mb-1">
              {" "}
              Experience luxury and comfort in our spacious room
            </h3>
            <p className="text-blue-600 font-bold text-2xl  mb-2">
              ${room.pricePerNight}{" "}
              <span className="text-base font-normal">/ night</span>
            </p>
          </div>
          {/* Amenities */}
          <div className="flex flex-wrap gap-3 mb-4 -mt-6">
            {/* Free Wi-Fi */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm min-w-[120px]">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.5 16.5a3.5 3.5 0 016.95 0M5 12.5a9 9 0 0114 0M2 9a13 13 0 0120 0"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                Free Wi-Fi
              </span>
            </div>
            {/* Room Service */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm min-w-[120px]">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18M4 7h16l-1 13H5L4 7zm8 4v4"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                Room Service
              </span>
            </div>
            {/* Pool Access */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm min-w-[120px]">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 18s1-2 3-2 3 2 6 2 3-2 6-2 3 2 3 2M3 14s1-2 3-2 3 2 6 2 3-2 6-2 3 2 3 2"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                Pool Access
              </span>
            </div>
            {/* Add more amenities as needed */}
          </div>
        </div>
        {/* checkout, and checkin information. form  */}
        <form className="bg-white justify-center  shadow-lg text-gray-500 rounded-lg px-6 py-4  flex flex-col  md:flex-row max-md:items-start gap-20 max-md:mx-auto ">
          <div>
            <div className="flex  items-center gap-2">
              <label className="text-black" htmlFor="checkIn">
                Check in
              </label>
            </div>
            <input
              id="checkIn"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="text-black" htmlFor="checkOut">
                Check out
              </label>
            </div>
            <input
              id="checkOut"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <label className="text-black" htmlFor="guests">
              Guests
            </label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
              placeholder="0"
            />
          </div>
          <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-10 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
            <span>Book Now</span>
          </button>
        </form>
        {/* common specification  */}
        <div className="space-y-6 mt-12">
          <h3 className="text-xl font-bold mb-2">More About This Hotel</h3>
          {roomCommonData.map((spec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 mb-4 px-4 py-3  rounded-lg ">
              <img
                src={spec.icon}
                alt={spec.label}
                className="w-8 h-8 text-blue-600 flex-shrink-0"
              />
              <div>
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {spec.title}
                </div>
                <p className="text-gray-700">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* description of hotel  */}
        <div className="mt-12 border-y border-gray-200 py-6 px-4">
          <h3 className="text-xl font-bold mb-2">Hotel Description</h3>
          <p className="text-gray-700">
            {room.description ||
              "Experience luxury and comfort in our spacious room, featuring modern amenities and stunning views. Perfect for a relaxing getaway or a business trip."}
          </p>
        </div>

        {/* hosted by  */}
        <div className="mt-12 flex flex-col items-start gap-2 py-6 px-4">
          <div className="flex items-center gap-4">
            <img
              src={room.hotel?.owner.image || assets.defaultHostImage}
              alt={room.host?.name || "Host"}
              className="w-16 h-16 rounded-full mb-2"
            />
            <div>
              <h3 className="text-xl font-medium mb-1">
                Hosted by {room.hotel?.name}
              </h3>
              {/* Rating & Reviews */}
              <div className="flex items-center gap-1 mb-2">
                <StarRating rating={room.rating} />
                <span className="text-gray-600">{room.rating}</span>
                <span className="text-gray-400">200+ reviews</span>
              </div>
            </div>
          </div>
        </div>
        {/* contact now  */}

        <div className=" px-6 py-2 ">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
