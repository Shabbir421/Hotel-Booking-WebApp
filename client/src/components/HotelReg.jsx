/** @format */

import React, { useState } from "react";
import { assets, cities } from "../assets/assets";

const HotelReg = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hotel Registered!\n" + JSON.stringify(form, null, 2));
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side Image */}
        <div className="md:w-1/2 w-full h-40 md:h-auto flex-shrink-0">
          <img
            src={assets.regImage}
            alt="Hotel"
            className="w-full h-full object-cover md:rounded-l-xl rounded-t-xl md:rounded-t-none md:rounded-bl-xl"
          />
        </div>
        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-4 flex flex-col justify-center">
          <button
            onClick={onClose}
            className="ml-auto mb-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close">
            &times;
          </button>
          <h2 className="text-xl font-bold mb-3 text-center">
            Register Your Hotel
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block font-medium mb-1">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter hotel name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                <option value="">Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded transition text-sm">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelReg;
