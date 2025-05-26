/** @format */

import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const sidebarlinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="w-64 h-screen bg-white px-4 py-6 border-r-2 border-gray-200">
      <nav className="flex flex-col gap-2">
        {sidebarlinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            end={link.path === "/owner"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium 
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }>
            <img src={link.icon} alt={link.name} className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
