/** @format */

import React from "react";

const Dashboard = () => {
  // Dummy data for demonstration
  const totalBookings = 128;
  const totalRevenue = 24560;

  const recentBookings = [
    {
      username: "John Doe",
      room: "Deluxe Suite",
      amount: 320,
      status: "Paid",
    },
    {
      username: "Jane Smith",
      room: "Ocean View Room",
      amount: 220,
      status: "Pending",
    },
    {
      username: "Michael Scott",
      room: "Executive Suite",
      amount: 410,
      status: "Paid",
    },
  ];

  return (
    <div className="px-3  space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Description */}
      <p className="text-gray-600">
        Overview of your platform's performance, bookings, and revenue.
      </p>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 ">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-blue-600">{totalBookings}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 ">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow  p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Room Name</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{booking.username}</td>
                  <td className="px-4 py-3">{booking.room}</td>
                  <td className="px-4 py-3">${booking.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
