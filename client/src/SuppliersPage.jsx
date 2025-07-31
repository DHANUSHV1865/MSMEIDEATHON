import React, { useState } from "react";

export default function SuppliersPage() {
  const [suppliers] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      contact: "John Smith",
      email: "john@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, Silicon Valley, CA",
      products: ["Laptops", "Monitors", "Keyboards"],
      rating: 4.8,
      status: "Active"
    },
    {
      id: 2,
      name: "Global Electronics",
      contact: "Sarah Johnson",
      email: "sarah@globalelec.com",
      phone: "+1 (555) 987-6543",
      address: "456 Electronics Ave, New York, NY",
      products: ["Smartphones", "Tablets", "Accessories"],
      rating: 4.5,
      status: "Active"
    },
    {
      id: 3,
      name: "Quality Parts Inc",
      contact: "Mike Davis",
      email: "mike@qualityparts.com",
      phone: "+1 (555) 456-7890",
      address: "789 Parts Blvd, Chicago, IL",
      products: ["Components", "Spare Parts"],
      rating: 4.2,
      status: "Inactive"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Supplier Management</h1>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            + Add Supplier
          </button>
        </div>

        {/* Supplier Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Suppliers</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </div>
              <div className="text-3xl">🏢</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Inactive</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="text-3xl">⏸️</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold">4.5</p>
              </div>
              <div className="text-3xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-[#435355] rounded-lg p-6 hover:bg-[#1a3a3d] transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{supplier.name}</h3>
                  <p className="text-sm text-gray-300">{supplier.contact}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  supplier.status === "Active" 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-500 text-white"
                }`}>
                  {supplier.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <span className="text-gray-300 mr-2">📧</span>
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-300 mr-2">📞</span>
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-300 mr-2">📍</span>
                  <span className="text-gray-300">{supplier.address}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Products:</p>
                <div className="flex flex-wrap gap-1">
                  {supplier.products.map((product, index) => (
                    <span key={index} className="px-2 py-1 bg-[#012A2D] text-xs rounded">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="text-sm">{supplier.rating}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Edit</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 