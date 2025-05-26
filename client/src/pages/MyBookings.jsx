/** @format */

import React, { useState } from "react";
import { userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings] = useState(userBookingsDummyData);
  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-8">
        Here you can find all your hotel bookings, including details, dates, and
        payment status.
      </p>
      <div className="overflow-x-auto border-y border-gray-200 py-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow text-sm sm:text-base">
          <thead>
            <tr>
              <th className="px-2 sm:px-6 py-3 text-left text-lg font-bold text-gray-700 whitespace-nowrap">
                Hotel
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-lg font-bold text-gray-700 whitespace-nowrap">
                Date & Timings
              </th>
              <th className="px-2 sm:px-6 py-3 text-left text-lg font-bold text-gray-700 whitespace-nowrap">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const room =
                userBookingsDummyData.find((r) => r._id === booking._id) || {};
              return (
                <tr key={booking.id} className="border-b last:border-b-0">
                  {/* Hotel Column */}
                  <td className="px-2 sm:px-6 py-4 align-top">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
                      <img
                        src={room.image}
                        alt={room.hotel?.name}
                        className="w-28 h-20 sm:w-36 sm:h-28 object-cover rounded-lg mb-2 sm:mb-0"
                      />
                      <div>
                        <div className="font-semibold text-base sm:text-lg">
                          {room.hotel?.name || "Hotel Name"}
                        </div>
                        <div className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
                          {/* Address Icon */}
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-3.314 0-6 2.239-6 5v2h12v-2c0-2.761-2.686-5-6-5z"
                            />
                          </svg>
                          {room.hotel?.address || "Hotel Address"}
                        </div>
                        <div className="text-gray-700 text-xs sm:text-sm mt-1 flex items-center gap-1">
                          {/* Guest Icon */}
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 13v-2a4 4 0 00-3-3.87M6 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          <span className="font-medium">Guests:</span>{" "}
                          {booking.guests}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Date & Timings Column */}
                  <td className="px-2 sm:px-6 py-4 align-top">
                    <div className="mb-1">
                      <span className="font-medium text-gray-700">
                        Booked At:
                      </span>{" "}
                      {booking.bookedAt}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-gray-700">
                        Check-in:
                      </span>
                      <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold text-xs sm:text-sm">
                        {booking.checkInDate}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-gray-700">
                        Check-out:
                      </span>
                      <span className="inline-block bg-green-50 text-green-700 px-2 py-1 rounded font-semibold text-xs sm:text-sm">
                        {booking.checkOutDate}
                      </span>
                    </div>
                  </td>
                  {/* Payment Column */}
                  <td className="px-2 sm:px-6 py-4 align-top">
                    <div className="mb-1">
                      <span className="font-medium text-gray-700">
                        Total Payment:
                      </span>{" "}
                      <span className="text-blue-600 font-semibold">
                        ${booking.totalPrice}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Payment Status:
                      </span>{" "}
                      {booking.paymentStatus === "paid" ? (
                        <span className="text-green-600 font-semibold">
                          Paid
                        </span>
                      ) : (
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-1 rounded transition"
                          onClick={() =>
                            alert(
                              "Redirect to payment for booking " + booking.id
                            )
                          }>
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
