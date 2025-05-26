/** @format */

import { SignedIn, UserButton } from "@clerk/clerk-react";
import React from "react";
import {
  RiDashboardLine,
  RiHomeSmile2Fill,
  RiProfileFill,
  RiUserLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50  bg-white text-gray-800 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="flex items-center text-2xl font-bold text-blue-600 gap-1">
            <RiHomeSmile2Fill className="text-3xl text-blue-500" />
            LuxeStay
          </span>
        </Link>
        {/* If signed in: show the user avatar */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "40px",
                  height: "40px",
                },
              },
            }}>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<RiProfileFill />}
                onClick={() => navigate("/my-bookings")}
              />
              <UserButton.Action
                label="Profile"
                labelIcon={<RiUserLine />}
                onClick={() => navigate("/profile")}
              />
              <UserButton.Action
                label="Dashboard"
                labelIcon={<RiDashboardLine />}
                onClick={() => navigate("/dashboard")}
              />
              {/* Add more actions as needed */}
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
