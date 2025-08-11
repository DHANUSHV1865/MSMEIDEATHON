import React, { useMemo, useState } from "react";
import { useNotifications } from "./NotificationContext";
import {
  FiAlertCircle,
  FiInfo,
  FiMail,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiBox,
} from "react-icons/fi";

const CATEGORY_CONFIG = {
  "Low Stock": {
    icon: <FiBox className="text-yellow-500" />, color: "border-yellow-400 bg-yellow-50"
  },
  "Out of Stock": {
    icon: <FiAlertCircle className="text-red-500" />, color: "border-red-400 bg-red-50"
  },
  "System Update": {
    icon: <FiInfo className="text-blue-500" />, color: "border-blue-400 bg-blue-50"
  },
  "Customer Query": {
    icon: <FiMail className="text-green-500" />, color: "border-green-400 bg-green-50"
  },
};

export default function NotificationBox() {
  const { notifications, dismissNotification, toggleRead, clearAllNotifications } = useNotifications();
  const [expandedId, setExpandedId] = useState(null);
  const [dismissing, setDismissing] = useState(() => new Set());

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDismiss = (id) => {
    setDismissing((prev) => new Set(prev).add(id));
    setTimeout(() => dismissNotification(id), 350);
  };

  const sorted = notifications; // already newest-first from provider

  return (
    <div className="fixed top-6 right-6 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800 bg-white/70 rounded px-2 py-1 backdrop-blur">Notifications</h3>
        <button onClick={clearAllNotifications} className="text-xs text-gray-500 hover:text-gray-800">Clear all</button>
      </div>
      <div className="flex flex-col gap-4">
        {sorted.map((n) => {
          const cat = CATEGORY_CONFIG[n.category] || CATEGORY_CONFIG["System Update"];
          const isDismissing = dismissing.has(n.id);
          return (
            <div
              key={n.id}
              className={`relative flex flex-col transition-all duration-300 ease-in-out shadow-lg rounded-xl border-l-4 ${cat.color} ${n.read ? "opacity-70" : "opacity-100"} ${isDismissing ? "animate-slideOut" : "animate-fadeIn"}`}
              style={{ minWidth: 0 }}
            >
              {/* Dismiss button */}
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors"
                onClick={() => handleDismiss(n.id)}
                aria-label="Dismiss notification"
              >
                <FiX />
              </button>
              <div
                className="flex items-start gap-3 p-4 cursor-pointer"
                onClick={() => toggleExpand(n.id)}
              >
                <div className="mt-1">{cat.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-base ${n.read ? "text-gray-500" : "text-gray-900"}`}>{n.title}</span>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                  <div className={`text-sm mt-1 ${n.read ? "text-gray-400" : "text-gray-700"}`}>{n.message}</div>
                  {/* Expand/collapse icon */}
                  <button
                    className="mt-2 text-xs text-blue-500 flex items-center gap-1 hover:underline focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); toggleExpand(n.id); }}
                  >
                    {expandedId === n.id ? <><FiChevronUp />Hide details</> : <><FiChevronDown />View details</>}
                  </button>
                </div>
                {/* Mark as read/unread */}
                <button
                  className={`ml-2 mt-1 px-2 py-1 rounded text-xs font-medium border transition-colors ${n.read ? "bg-white text-blue-500 border-blue-300 hover:bg-blue-50" : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"}`}
                  onClick={(e) => { e.stopPropagation(); toggleRead(n.id); }}
                >
                  {n.read ? "Mark as Unread" : "Mark as Read"}
                </button>
              </div>
              {/* Expanded details */}
              {expandedId === n.id && n.details && (
                <div className="px-12 pb-4 text-sm text-gray-600 animate-fadeIn">
                  {n.details}
                </div>
              )}
            </div>
          );
        })}
        {sorted.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow p-6 text-center text-gray-500">
            No notifications 🎉
          </div>
        )}
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn 0.5s; }
        @keyframes slideOut { from { opacity: 1; transform: translateX(0);} to { opacity: 0; transform: translateX(20px);} }
        .animate-slideOut { animation: slideOut 0.35s forwards; }
      `}</style>
    </div>
  );
}
