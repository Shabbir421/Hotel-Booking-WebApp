/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-6">
        {/* Left: Title and Description */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl  text-black mb-2 items-baseline">
            Exclusive Offers
          </h2>
          <p className="text-gray-600 text-lg">
            Unlock special deals and limited-time discounts for your next stay.
            Book now and save more!
          </p>
        </div>
        {/* Right: View All Offers Button */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Link
            to="/offers"
            className="inline-block  text-black border px-6 py-3 rounded-md text-lg font-medium  transition">
            View All Offers <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom: Offer Cards with overlay */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer group">
            <img
              src={item.image}
              alt={item.title}
              className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay */}
            <div className="absolute  inset-0 bg-opacity-50 flex flex-col justify-end p-6 text-white">
              <div className="absolute top-3 left-3 bg-white text-green-900 text-sm font-bold px-3 py-1 rounded shadow-md">
                {item.priceOff}% Off
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm mb-1">{item.description}</p>
              <p className="text-xs opacity-75 mb-4">
                Expires: {item.expiryDate}
              </p>
              <Link
                to={`/offers/${item._id}`}
                className=" text-white px-4 py-2 rounded-md text-left font-medium">
                View Offer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
