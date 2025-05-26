/** @format */

import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddRoom = () => {
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);

  const fileInputs = useRef([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file); // for preview
      setImages(updatedImages);
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const amenityOptions = [
    "Free WiFi",
    "Free Breakfast",
    "Room Service",
    "Mountain View",
    "Pool Access",
  ];

  return (
    <div className="px-3 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Add Room</h1>

      {/* Description */}
      <p className="text-gray-600">Fill in the details to list a new room.</p>

      {/* Image Upload */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
            onClick={() => fileInputs.current[index].click()}
          >
            {img ? (
              <img
                src={img}
                alt={`Upload ${index}`}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <FaCloudUploadAlt className="text-3xl text-gray-400" />
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={(el) => (fileInputs.current[index] = el)}
              onChange={(e) => handleImageChange(e, index)}
            />
          </div>
        ))}
      </div>

      {/* Room Type and Price */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Room Type
          </label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Room Type</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Executive">Executive</option>
            <option value="Suite">Suite</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Price/Night ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Amenities</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {amenityOptions.map((amenity, index) => (
            <label key={index} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={amenity}
                checked={amenities.includes(amenity)}
                onChange={handleAmenityChange}
                className="accent-blue-600"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Add Room Button */}
      <div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoom;
