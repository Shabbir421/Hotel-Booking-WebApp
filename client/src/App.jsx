/**
 * The App component in this React application renders different pages based on the route, including a
 * Navbar, Home page, AllRooms page, and a login page with SignIn component.
 *
 * @format
 * @returns The `App` component is being returned, which includes the structure of the application with a conditional rendering of the `Navbar`, different routes using `Routes` and `Route` components from `react-router-dom`, and components like `Home`, `AllRooms`, `SignIn`, and `Footer` being rendered based on the route path.
 */

/** @format */

import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { SignIn } from "@clerk/clerk-react";
import AllRooms from "./pages/AllRooms";
import Footer from "./components/Footer";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import AboutUs from "./pages/AboutUs";
import Experience from "./pages/Experience";

function App() {
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOwnerPath && <Navbar />}
      <HotelReg />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>

        <Route
          path="/login"
          element={
            <div className=" inset-0  flex items-center justify-center  z-50">
              <div className="rounded-lg shadow-lg p-6">
                <SignIn />
              </div>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
