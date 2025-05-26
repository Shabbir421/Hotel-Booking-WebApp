/** @format */

import React, { useState } from "react";
import { assets, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

const Radiobox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="sortoption"
      checked={selected}
      onChange={() => onChange(label)}
      className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();

  const RoomTypes = ["Single", "Double", "Suite", "Deluxe"];
  const PriceRanges = [
    { label: "Any", min: 0, max: Infinity },
    { label: "$0 - $100", min: 0, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $300", min: 200, max: 300 },
    { label: "$300+", min: 300, max: Infinity },
  ];
  const SortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "priceLowHigh" },
    { label: "Price: High to Low", value: "priceHighLow" },
    { label: "Rating: High to Low", value: "ratingHighLow" },
  ];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any");
  const [selectedSort, setSelectedSort] = useState("Default");

  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handlePriceRangeChange = (checked, label) => {
    if (checked) setSelectedPriceRange(label);
    else setSelectedPriceRange("Any");
  };

  const handleSortChange = (label) => {
    setSelectedSort(label);
  };

  // Filter & Sort Logic
  const filteredRooms = roomsDummyData
    .filter((room) =>
      selectedRoomTypes.length
        ? selectedRoomTypes.includes(room.roomType)
        : true
    )
    .filter((room) => {
      const range = PriceRanges.find((r) => r.label === selectedPriceRange);
      return range
        ? room.pricePerNight >= range.min && room.pricePerNight <= range.max
        : true;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "Price: Low to High":
          return a.pricePerNight - b.pricePerNight;
        case "Price: High to Low":
          return b.pricePerNight - a.pricePerNight;
        case "Rating: High to Low":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col-reverse mt-4 md:flex-row justify-between gap-8 px-4 py-8 max-w-6xl mx-auto">
      {/* Room List */}
      <div className="flex-1 bg-white border border-gray-200 rounded p-2 h-max">
        <h2 className="text-2xl font-bold mb-6">Hotel Rooms</h2>
        {filteredRooms.length === 0 ? (
          <p className="text-gray-500">No rooms match your filters.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="bg-white border-t border-b border-gray-200 p-4 flex flex-col md:flex-row gap-4">
                <img
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  src={room.images?.[0]}
                  alt={room.hotel?.name}
                  className="w-full md:w-48 h-40 object-cover rounded-lg cursor-pointer"
                />
                <div className="flex flex-col flex-1">
                  <h3
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      scrollTo(0, 0);
                    }}
                    className="text-lg font-semibold cursor-pointer">
                    {room.hotel.name}
                  </h3>
                  <p className="text-gray-500 flex items-center text-sm mb-1">
                    <img src={assets.locationIcon} alt="" />
                    <span> {room.hotel?.address}</span>
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={room.rating || 4.5} />
                    <p>{room.reviews || "200+"} reviews</p>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-3 mt-2 mb-3">
                    {room.amenities.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm min-w-[120px]">
                        <span className="text-xs font-medium text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-blue-600 font-bold text-lg mb-2">
                    ${room.pricePerNight}/
                    <span className="text-sm font-normal">night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className="w-full md:w-82 bg-white border border-gray-200 rounded p-6 h-max">
        <h3 className="text-lg font-bold mb-4">Filter</h3>

        {/* Room Types */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Room Type</h4>
          <div className="flex flex-col gap-2">
            {RoomTypes.map((type) => (
              <CheckBox
                key={type}
                label={type}
                selected={selectedRoomTypes.includes(type)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Price Range</h4>
          <div className="flex flex-col gap-2">
            {PriceRanges.map((range) => (
              <CheckBox
                key={range.label}
                label={range.label}
                selected={selectedPriceRange === range.label}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Sort By</h4>
          <div className="flex flex-col gap-2">
            {SortOptions.map((option) => (
              <Radiobox
                key={option.label}
                label={option.label}
                selected={selectedSort === option.label}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
