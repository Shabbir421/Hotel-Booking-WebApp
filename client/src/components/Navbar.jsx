/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiHomeSmile2Fill,
  RiSearchLine,
  RiUserLine,
  RiDashboardLine,
  RiProfileFill,
} from "react-icons/ri";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

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

        {/* Hamburger menu for mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-600 focus:outline-none"
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {/* Normal links */}
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/rooms" className="hover:underline">
              Hotels
            </Link>
          </li>
          <li>
            <Link to="/experience" className="hover:underline">
              Experience
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>

          {/* Special links with icons and button style */}
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
              <RiDashboardLine className="text-lg" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center gap-1 px-3 py-1 rounded-md ">
              <RiSearchLine className="text-lg" />
            </Link>
          </li>
          <li>
            <Link to="/login">
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

              {/* If signed out: show a login button */}
              <SignedOut>
                <button
                  onClick={() => openSignIn()}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-400 transition">
                  <RiUserLine className="text-lg" />
                  Login
                </button>
              </SignedOut>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="flex flex-col gap-2 px-6 pb-4 md:hidden bg-white items-center justify-center text-center">
          {/* Normal links */}
          <li>
            <Link
              to="/"
              onClick={toggleMenu}
              className="block py-2 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/hotels"
              onClick={toggleMenu}
              className="block py-2 hover:underline">
              Hotels
            </Link>
          </li>
          <li>
            <Link
              to="/experience"
              onClick={toggleMenu}
              className="block py-2 hover:underline">
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block py-2 hover:underline">
              About
            </Link>
          </li>

          {/* Special links with icons and button style */}
          <li>
            <Link
              to="/dashboard"
              onClick={toggleMenu}
              className="flex items-center gap-1 px-3 py-2 rounded-md">
              <RiDashboardLine className="text-lg" />
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/login">
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

              {/* If signed out: show a login button */}
              <SignedOut>
                <button
                  onClick={() => openSignIn()}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-400 transition">
                  <RiUserLine className="text-lg" />
                  Login
                </button>
              </SignedOut>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
