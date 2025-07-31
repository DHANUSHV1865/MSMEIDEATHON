import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./HomePage";
import ProductManagement from "./ProductManagement";
import InventoryPage from "./InventoryPage";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-[#012A2D] p-4 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
