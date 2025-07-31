import React from "react";

export default function InventoryPage() {
  const products = [
    { id: 1, name: "Rice Bags (25kg)", stock: 50, price: 1200 },
    { id: 2, name: "Cooking Oil (5L)", stock: 30, price: 450 },
    { id: 3, name: "Sugar (1kg)", stock: 100, price: 42 },
    { id: 4, name: "Wheat Flour (10kg)", stock: 25, price: 380 },
    { id: 5, name: "Dal (Lentils) 1kg", stock: 80, price: 85 },
    { id: 6, name: "Tea Powder (500g)", stock: 60, price: 180 },
    { id: 7, name: "Mustard Oil (1L)", stock: 0, price: 120 }, // Out of stock
    { id: 8, name: "Basmati Rice (5kg)", stock: 35, price: 650 },
  ];

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 20).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-[#435355] p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">📦 Live Inventory Management</h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-[#012A2D] p-4 rounded-lg shadow text-center">
          <p className="text-lg font-bold">Total Stock</p>
          <p className="text-2xl">{totalStock}</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-bold">Low Stock</p>
          <p className="text-2xl">{lowStockCount}</p>
        </div>
        <div className="bg-red-600 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-bold">Out of Stock</p>
          <p className="text-2xl">{outOfStockCount}</p>
        </div>
        <div className="bg-green-600 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-bold">Total Value</p>
          <p className="text-2xl">₹{totalValue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-bold">Total Products</p>
          <p className="text-2xl">{totalProducts}</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#012A2D] p-4 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#435355]">
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isOutOfStock = product.stock === 0;
              return (
                <tr
                  key={product.id}
                  className="hover:bg-[#2a3b3c] transition-colors"
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-sm font-bold ${
                        isOutOfStock
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
