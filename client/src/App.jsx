import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import HomePage from "./HomePage";
import DashboardPage from "./DashboardPage";
import ProductManagement from "./ProductManagement";
import InventoryPage from "./InventoryPage";
import SalesPage from "./SalesPage";
import OrdersPage from "./OrdersPage";
import SuppliersPage from "./SuppliersPage";
import AnalyticsPage from "./AnalyticsPage";
import LogisticsPage from "./LogisticsPage";
import Login from "./Login";
import Signup from "./signup";
import { NotificationProvider } from "./components/NotificationContext";
import NotificationBox from "./components/NotificationBox";

export default function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-[#012A2D] p-4 text-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/logistics" element={<LogisticsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <NotificationBox />
          <Chatbot />
        </div>
      </NotificationProvider>
    </Router>
  );
}
