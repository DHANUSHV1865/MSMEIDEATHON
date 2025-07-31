import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home", emoji: "🏠" },
    { path: "/products", label: "Products", emoji: "🛒" },
    { path: "/inventory", label: "Inventory", emoji: "📦" },
    { path: "/login", label: "Login", emoji: "🔑" },
    { path: "/signup", label: "Sign Up", emoji: "✍️" },
  ];

  return (
    <div
      className={`h-screen flex flex-col bg-[#012A2D] text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="flex justify-end p-2 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <FiChevronRight className="text-xl" />
        ) : (
          <FiChevronLeft className="text-xl" />
        )}
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black">
          IM
        </div>
        {!collapsed && <span className="ml-3 font-bold">Inventory</span>}
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-[#435355] transition-all ${
              location.pathname === item.path ? "bg-[#435355]" : ""
            }`}
          >
            <span className="text-lg">{item.emoji}</span>
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
