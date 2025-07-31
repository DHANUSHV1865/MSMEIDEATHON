import React, { useState } from "react";

export default function SalesPage() {
  const [sales] = useState([
    {
      id: 1,
      customer: "John Doe",
      products: ["Laptop", "Mouse"],
      total: 1250.00,
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: 2,
      customer: "Jane Smith",
      products: ["Monitor"],
      total: 299.99,
      date: "2024-01-14",
      status: "Pending"
    },
    {
      id: 3,
      customer: "Bob Johnson",
      products: ["Keyboard", "Headphones"],
      total: 189.50,
      date: "2024-01-13",
      status: "Completed"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            + New Sale
          </button>
        </div>

        {/* Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Sales</p>
                <p className="text-2xl font-bold">$1,739.49</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">This Month</p>
                <p className="text-2xl font-bold">$1,250.00</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending Sales</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-[#435355] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#012A2D]">
            <h2 className="text-xl font-semibold">Recent Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#012A2D]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Sale ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Products</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#012A2D]">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-[#012A2D] transition-colors">
                    <td className="px-6 py-4 text-sm">#{sale.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{sale.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {sale.products.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">${sale.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{sale.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sale.status === "Completed" 
                          ? "bg-green-500 text-white" 
                          : "bg-yellow-500 text-black"
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                        <button className="text-green-400 hover:text-green-300 text-sm">Edit</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
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