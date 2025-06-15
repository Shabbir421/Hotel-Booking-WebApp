/** @format */

import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const HotelReg = () => {
  const { setShowHotelRegister, axios, getToken, setIsOwner } = useAppContext();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
    ownerId: "",
  });

  // ✅ ADDED: handleChange function to update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check for authenticated user BEFORE sending request
    if (!user?.id) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const token = await getToken();
      console.log("TOKEN:", token); // Debug token

      const res = await axios.post(
        `/api/hotels/`,
        {
          name: form.name,
          contact: form.contact,
          address: form.address,
          city: form.city,
          ownerId: user.id, // ✅ user.id will now always exist here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.data); // Debug response

      if (res.data.success) {
        toast.success("Hotel registered successfully!");
        setIsOwner(true);
        setShowHotelRegister(false);
      } else {
        toast.error(res.data?.message || "Failed to register hotel.");
      }
    } catch (error) {
      console.error("AXIOS ERROR:", error); // Full error
      toast.error(
        error?.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 bg-black/70">
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
            onClick={() => setShowHotelRegister(false)}
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
              <label className="block font-medium mb-1">contact</label>
              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="Enter contact number"
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
