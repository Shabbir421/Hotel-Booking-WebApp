/** @format */

import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const amenityOptions = [
  "Free WiFi",
  "Free Breakfast",
  "Room Service",
  "Mountain View",
  "Pool Access",
];

const AddRoom = () => {
  const { axios, getToken } = useAppContext();
  const fileInputs = useRef([]);
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = { ...images, [index + 1]: file };
      setImages(updatedImages);
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [value]: checked,
      },
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { roomType, pricePerNight, amenities } = inputs;

    if (
      !roomType ||
      !pricePerNight ||
      Object.values(amenities).every((v) => !v) ||
      Object.values(images).every((img) => !img)
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", roomType);
      formData.append("pricePerNight", pricePerNight);

      const selectedAmenities = Object.keys(amenities).filter(
        (key) => amenities[key]
      );
      formData.append("amenities", JSON.stringify(selectedAmenities));

      Object.values(images).forEach((img) => {
        if (img) formData.append("images", img);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (data.success) {
        toast.success("Room added successfully");
        setInputs({
          roomType: "",
          pricePerNight: "",
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-3 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Add Room</h1>
      <p className="text-gray-600">Fill in the details to list a new room.</p>

      {/* Image Upload */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(images).map(([key, img], index) => (
          <div
            key={index}
            className="relative h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
            onClick={() => fileInputs.current[index]?.click()}>
            {img ? (
              <img
                src={URL.createObjectURL(img)}
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
            value={inputs.roomType}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, roomType: e.target.value }))
            }
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                pricePerNight: e.target.value,
              }))
            }
            placeholder="Enter price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {amenityOptions.map((amenity, index) => (
            <label key={index} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={amenity}
                checked={inputs.amenities[amenity]}
                onChange={handleAmenityChange}
                className="accent-blue-600"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60">
          {loading ? "Adding..." : "Add Room"}
        </button>
      </div>
    </form>
  );
};

export default AddRoom;
