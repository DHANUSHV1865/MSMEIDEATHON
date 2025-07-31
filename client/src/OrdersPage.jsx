import React, { useState } from "react";

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-001",
      customer: "Alice Johnson",
      email: "alice@email.com",
      items: [
        { name: "Gaming Laptop", quantity: 1, price: 1299.99 },
        { name: "Gaming Mouse", quantity: 1, price: 79.99 }
      ],
      total: 1379.98,
      status: "Processing",
      date: "2024-01-15",
      shipping: "Express"
    },
    {
      id: "ORD-002",
      customer: "Mike Wilson",
      email: "mike@email.com",
      items: [
        { name: "Wireless Headphones", quantity: 2, price: 89.99 }
      ],
      total: 179.98,
      status: "Shipped",
      date: "2024-01-14",
      shipping: "Standard"
    },
    {
      id: "ORD-003",
      customer: "Sarah Davis",
      email: "sarah@email.com",
      items: [
        { name: "Mechanical Keyboard", quantity: 1, price: 149.99 },
        { name: "Mouse Pad", quantity: 1, price: 19.99 }
      ],
      total: 169.98,
      status: "Delivered",
      date: "2024-01-13",
      shipping: "Standard"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "bg-blue-500 text-white";
      case "Shipped": return "bg-yellow-500 text-black";
      case "Delivered": return "bg-green-500 text-white";
      case "Cancelled": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            + New Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Processing</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Shipped</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-3xl">🚚</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Delivered</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#435355] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#012A2D]">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#012A2D]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#012A2D]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#012A2D] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-gray-300">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Edit</button>
                        <button className="text-yellow-400 hover:text-yellow-300 text-sm">Track</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 