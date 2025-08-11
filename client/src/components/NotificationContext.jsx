import React, { createContext, useContext, useMemo, useRef, useState, useCallback } from "react";

// Notification shape reference
// {
//   id: number,
//   title: string,
//   message: string,
//   details?: string,
//   category: 'Low Stock' | 'Out of Stock' | 'System Update' | 'Customer Query' | string,
//   time: string, // e.g., '2 min ago' or formatted time
//   read: boolean
// }

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const now = new Date();
    return [
      {
        id: now.getTime(),
        title: "Welcome",
        message: "Your notification center is set up.",
        category: "System Update",
        time: "Just now",
        read: true,
        details: "You can receive low stock and out-of-stock alerts here.",
      },
    ];
  });

  // Prevent duplicates by tracking unique keys for auto-generated alerts
  const seenKeysRef = useRef(new Set());

  const addNotification = useCallback((notification, uniqueKey) => {
    if (uniqueKey) {
      if (seenKeysRef.current.has(uniqueKey)) return;
      seenKeysRef.current.add(uniqueKey);
    }
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const time = notification.time || "Just now";
    const read = notification.read ?? false;
    setNotifications((prev) => [
      { id, time, read, ...notification },
      ...prev,
    ]);
  }, []);

  const addNotificationsBulk = useCallback((items) => {
    setNotifications((prev) => [
      ...items.map((n) => ({ id: Date.now() + Math.floor(Math.random() * 100000), read: n.read ?? false, time: n.time || "Just now", ...n })),
      ...prev,
    ]);
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    seenKeysRef.current.clear();
  }, []);

  const value = useMemo(() => ({
    notifications,
    addNotification,
    addNotificationsBulk,
    dismissNotification,
    toggleRead,
    clearAllNotifications,
  }), [notifications, addNotification, addNotificationsBulk, dismissNotification, toggleRead, clearAllNotifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within a NotificationProvider");
  return ctx;
}
