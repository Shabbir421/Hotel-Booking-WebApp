/** @format */

import React from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import SideBar from "../../components/hotelOwner/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
