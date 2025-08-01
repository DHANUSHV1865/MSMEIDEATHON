import React, { useState } from "react";

export default function SalesPage() {
  const [sales, setSales] = useState([
    {
      id: 1,
      customer: "John Doe",
      products: ["Milk", "Bread", "Eggs"],
      total: 12.50,
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: 2,
      customer: "Jane Smith",
      products: ["Apples", "Bananas", "Oranges"],
      total: 8.99,
      date: "2024-01-14",
      status: "Pending"
    },
    {
      id: 3,
      customer: "Bob Johnson",
      products: ["Rice", "Pasta", "Tomatoes"],
      total: 15.75,
      date: "2024-01-13",
      status: "Completed"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [newSale, setNewSale] = useState({
    customer: "",
    products: [],
    total: 0
  });

  const groceryItems = [
    { name: "Milk", price: 3.99, emoji: "🥛" },
    { name: "Bread", price: 2.49, emoji: "🍞" },
    { name: "Eggs", price: 4.99, emoji: "🥚" },
    { name: "Apples", price: 1.99, emoji: "🍎" },
    { name: "Bananas", price: 1.49, emoji: "🍌" },
    { name: "Oranges", price: 2.99, emoji: "🍊" },
    { name: "Rice", price: 8.99, emoji: "🍚" },
    { name: "Pasta", price: 2.99, emoji: "🍝" },
    { name: "Tomatoes", price: 3.49, emoji: "🍅" },
    { name: "Potatoes", price: 4.99, emoji: "🥔" },
    { name: "Onions", price: 2.99, emoji: "🧅" },
    { name: "Carrots", price: 1.99, emoji: "🥕" },
    { name: "Chicken", price: 12.99, emoji: "🍗" },
    { name: "Beef", price: 15.99, emoji: "🥩" },
    { name: "Fish", price: 18.99, emoji: "🐟" },
    { name: "Cheese", price: 6.99, emoji: "🧀" },
    { name: "Yogurt", price: 4.99, emoji: "🥛" },
    { name: "Butter", price: 5.99, emoji: "🧈" },
    { name: "Sugar", price: 3.99, emoji: "🍯" },
    { name: "Flour", price: 4.49, emoji: "🌾" }
  ];

  const addProductToSale = (item) => {
    setNewSale(prev => ({
      ...prev,
      products: [...prev.products, item.name],
      total: prev.total + item.price
    }));
  };

  const removeProductFromSale = (index) => {
    const removedProduct = newSale.products[index];
    const item = groceryItems.find(g => g.name === removedProduct);
    setNewSale(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
      total: prev.total - (item ? item.price : 0)
    }));
  };

  const handleAddSale = () => {
    if (newSale.customer && newSale.products.length > 0) {
      const sale = {
        id: sales.length + 1,
        customer: newSale.customer,
        products: [...newSale.products],
        total: newSale.total,
        date: new Date().toISOString().split('T')[0],
        status: "Completed"
      };
      setSales([...sales, sale]);
      setNewSale({ customer: "", products: [], total: 0 });
      setShowAddModal(false);
    }
  };

  const handleViewSale = (sale) => {
    setSelectedSale(sale);
    setShowViewModal(true);
  };

  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setNewSale({
      customer: sale.customer,
      products: [...sale.products],
      total: sale.total
    });
    setShowEditModal(true);
  };

  const handleDeleteSale = (saleId) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      setSales(sales.filter(sale => sale.id !== saleId));
    }
  };

  const handleUpdateSale = () => {
    if (selectedSale && newSale.customer && newSale.products.length > 0) {
      const updatedSales = sales.map(sale => 
        sale.id === selectedSale.id 
          ? { ...sale, customer: newSale.customer, products: newSale.products, total: newSale.total }
          : sale
      );
      setSales(updatedSales);
      setNewSale({ customer: "", products: [], total: 0 });
      setSelectedSale(null);
      setShowEditModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            + Add Sales
          </button>
        </div>

        {/* Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          {/* Removed Pending Sales section */}
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
                        <button 
                          onClick={() => handleViewSale(sale)}
                          className="text-blue-400 hover:text-blue-300 text-sm bg-blue-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleEditSale(sale)}
                          className="text-green-400 hover:text-green-300 text-sm bg-green-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteSale(sale.id)}
                          className="text-red-400 hover:text-red-300 text-sm bg-red-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Sale Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Sale</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <label className="block text-sm font-medium mb-2">Customer Name</label>
                <input
                  type="text"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  placeholder="Enter customer name"
                />
              </div>

              {/* Selected Products */}
              <div>
                <label className="block text-sm font-medium mb-2">Selected Products</label>
                <div className="bg-[#012A2D] rounded-lg p-3 min-h-[100px]">
                  {newSale.products.length === 0 ? (
                    <p className="text-gray-400 text-sm">No products selected</p>
                  ) : (
                    <div className="space-y-2">
                      {newSale.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#435355] p-2 rounded">
                          <span className="text-sm">{product}</span>
                          <button 
                            onClick={() => removeProductFromSale(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold">Total: ${newSale.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Grocery Items Grid */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-4">Select Grocery Items</label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {groceryItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => addProductToSale(item)}
                    className="bg-[#012A2D] p-3 rounded-lg hover:bg-[#2a3a3c] transition-colors text-center"
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-300">${item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSale}
                disabled={!newSale.customer || newSale.products.length === 0}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Sale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Sale Modal */}
      {showViewModal && selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sale Details</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Sale ID</label>
                <p className="text-white font-semibold">#{selectedSale.id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Customer</label>
                <p className="text-white">{selectedSale.customer}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Products</label>
                <div className="bg-[#012A2D] rounded p-3">
                  {selectedSale.products.map((product, index) => (
                    <div key={index} className="text-white text-sm py-1">
                      • {product}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Total Amount</label>
                <p className="text-yellow-400 font-bold text-xl">${selectedSale.total.toFixed(2)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Date</label>
                <p className="text-white">{selectedSale.date}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedSale.status === "Completed" 
                    ? "bg-green-500 text-white" 
                    : "bg-yellow-500 text-black"
                }`}>
                  {selectedSale.status}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sale Modal */}
      {showEditModal && selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Sale #{selectedSale.id}</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <label className="block text-sm font-medium mb-2">Customer Name</label>
                <input
                  type="text"
                  value={newSale.customer}
                  onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                  className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  placeholder="Enter customer name"
                />
              </div>

              {/* Selected Products */}
              <div>
                <label className="block text-sm font-medium mb-2">Selected Products</label>
                <div className="bg-[#012A2D] rounded-lg p-3 min-h-[100px]">
                  {newSale.products.length === 0 ? (
                    <p className="text-gray-400 text-sm">No products selected</p>
                  ) : (
                    <div className="space-y-2">
                      {newSale.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#435355] p-2 rounded">
                          <span className="text-sm">{product}</span>
                          <button 
                            onClick={() => removeProductFromSale(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold">Total: ${newSale.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Grocery Items Grid */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-4">Select Grocery Items</label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {groceryItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => addProductToSale(item)}
                    className="bg-[#012A2D] p-3 rounded-lg hover:bg-[#2a3a3c] transition-colors text-center"
                  >
                    <div className="text-2xl mb-1">{item.emoji}</div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-gray-300">${item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSale}
                disabled={!newSale.customer || newSale.products.length === 0}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 