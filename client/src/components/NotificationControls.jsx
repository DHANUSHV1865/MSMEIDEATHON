import React, { useMemo, useState } from "react";
import { useNotifications } from "./NotificationContext";

const CATEGORY_OPTIONS = [
  "Low Stock",
  "Out of Stock",
  "System Update",
  "Customer Query",
];

export default function NotificationControls() {
  const { addNotification, clearAllNotifications } = useNotifications();
  const [category, setCategory] = useState("Low Stock");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState("");

  const canAdd = title.trim().length > 0 && message.trim().length > 0;

  const addCustom = () => {
    if (!canAdd) return;
    addNotification({ category, title, message, details, read: false });
    setTitle("");
    setMessage("");
    setDetails("");
  };

  const addDemoLowStock = () => {
    addNotification({
      category: "Low Stock",
      title: "Low Stock: Demo Item",
      message: "Demo Item is running low (only 7 left).",
      details: "Consider contacting suppliers to restock Demo Item.",
      read: false,
    });
  };

  const addDemoOutOfStock = () => {
    addNotification({
      category: "Out of Stock",
      title: "Out of Stock: Demo Item",
      message: "Demo Item is currently out of stock.",
      details: "Create a purchase order or contact supplier.",
      read: false,
    });
  };

  const addDemoSystemUpdate = () => {
    addNotification({
      category: "System Update",
      title: "System Update",
      message: "New analytics charts available on the Dashboard.",
      details: "Visit the Analytics page to explore.",
      read: false,
    });
  };

  const addDemoCustomerQuery = () => {
    addNotification({
      category: "Customer Query",
      title: "Customer Query: Order #1001",
      message: "Customer asks about delivery timing.",
      details: "Respond within 24 hours to maintain SLA.",
      read: false,
    });
  };

  return (
    <div className="w-full max-w-3xl bg-[#012A2D] border border-gray-700 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-3">Notification Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#435355] text-white rounded px-3 py-2 border border-gray-600 focus:outline-none"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="bg-[#435355] text-white rounded px-3 py-2 border border-gray-600 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-gray-300">Message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Short message"
            className="bg-[#435355] text-white rounded px-3 py-2 border border-gray-600 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-gray-300">Details (optional)</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Additional details..."
            className="bg-[#435355] text-white rounded px-3 py-2 border border-gray-600 focus:outline-none min-h-[80px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={addCustom}
          disabled={!canAdd}
          className="bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded"
        >
          Add Notification
        </button>
        <button onClick={addDemoLowStock} className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-4 py-2 rounded">Demo Low Stock</button>
        <button onClick={addDemoOutOfStock} className="bg-red-500 hover:bg-red-400 text-white font-medium px-4 py-2 rounded">Demo Out of Stock</button>
        <button onClick={addDemoSystemUpdate} className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-4 py-2 rounded">Demo System Update</button>
        <button onClick={addDemoCustomerQuery} className="bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-4 py-2 rounded">Demo Customer Query</button>
        <button onClick={clearAllNotifications} className="ml-auto bg-gray-500 hover:bg-gray-400 text-white font-medium px-4 py-2 rounded">Clear All</button>
      </div>
    </div>
  );
}
