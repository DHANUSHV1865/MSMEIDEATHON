import React from "react";
import NotificationControls from "./components/NotificationControls";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#435355] text-white p-4">
      <div className="w-full max-w-5xl space-y-6">
        <h1 className="text-4xl font-bold">Welcome to SimpleShelf</h1>
        <p className="text-gray-200">Use the controls below to add or remove notifications for testing.</p>
        <NotificationControls />
      </div>
    </div>
  );
}
