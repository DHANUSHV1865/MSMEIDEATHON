import React, { useState } from "react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Fresh Grocery Supplies",
      contact: "John Smith",
      email: "john@freshgrocery.com",
      phone: "+1 (555) 123-4567",
      address: "123 Fresh Street, Market District, CA",
      products: ["Milk", "Bread", "Eggs", "Vegetables"],
      rating: 4.8,
      status: "Active"
    },
    {
      id: 2,
      name: "Organic Food Co.",
      contact: "Sarah Johnson",
      email: "sarah@organicfood.com",
      phone: "+1 (555) 987-6543",
      address: "456 Organic Ave, Farm City, NY",
      products: ["Organic Fruits", "Organic Vegetables", "Organic Dairy"],
      rating: 4.5,
      status: "Active"
    },
    {
      id: 3,
      name: "Bulk Food Suppliers",
      contact: "Mike Davis",
      email: "mike@bulkfood.com",
      phone: "+1 (555) 456-7890",
      address: "789 Bulk Blvd, Warehouse District, IL",
      products: ["Rice", "Pasta", "Flour", "Sugar"],
      rating: 4.2,
      status: "Inactive"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    products: []
  });

  const availableProducts = [
    "Milk", "Bread", "Eggs", "Rice", "Pasta", "Flour", "Sugar", "Salt",
    "Apples", "Bananas", "Oranges", "Tomatoes", "Potatoes", "Onions",
    "Carrots", "Chicken", "Beef", "Fish", "Cheese", "Yogurt", "Butter",
    "Cooking Oil", "Tea", "Coffee", "Spices", "Nuts", "Dried Fruits"
  ];

  const addProductToSupplier = (product) => {
    if (!newSupplier.products.includes(product)) {
      setNewSupplier(prev => ({
        ...prev,
        products: [...prev.products, product]
      }));
    }
  };

  const removeProductFromSupplier = (product) => {
    setNewSupplier(prev => ({
      ...prev,
      products: prev.products.filter(p => p !== product)
    }));
  };

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.email && newSupplier.address) {
      const supplier = {
        id: suppliers.length + 1,
        name: newSupplier.name,
        contact: newSupplier.contact,
        email: newSupplier.email,
        phone: newSupplier.phone,
        address: newSupplier.address,
        products: [...newSupplier.products],
        rating: 4.0,
        status: "Active"
      };
      setSuppliers([...suppliers, supplier]);
      setNewSupplier({ name: "", contact: "", email: "", phone: "", address: "", products: [] });
      setShowAddModal(false);
    }
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowViewModal(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setNewSupplier({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      products: [...supplier.products]
    });
    setShowEditModal(true);
  };

  const handleDeleteSupplier = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    }
  };

  const handleUpdateSupplier = () => {
    if (selectedSupplier && newSupplier.name && newSupplier.email && newSupplier.address) {
      const updatedSuppliers = suppliers.map(supplier => 
        supplier.id === selectedSupplier.id 
          ? { ...supplier, ...newSupplier, products: [...newSupplier.products] }
          : supplier
      );
      setSuppliers(updatedSuppliers);
      setNewSupplier({ name: "", contact: "", email: "", phone: "", address: "", products: [] });
      setSelectedSupplier(null);
      setShowEditModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Supplier Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
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
                <p className="text-2xl font-bold">{suppliers.filter(s => s.status === "Active").length}</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Inactive</p>
                <p className="text-2xl font-bold">{suppliers.filter(s => s.status === "Inactive").length}</p>
              </div>
              <div className="text-3xl">⏸️</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)}
                </p>
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
                  <button 
                    onClick={() => handleViewSupplier(supplier)}
                    className="text-blue-400 hover:text-blue-300 text-sm bg-blue-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditSupplier(supplier)}
                    className="text-green-400 hover:text-green-300 text-sm bg-green-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="text-red-400 hover:text-red-300 text-sm bg-red-900 bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Supplier</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supplier Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Supplier Name *</label>
                  <input
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Person</label>
                  <input
                    type="text"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <textarea
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>
              </div>

              {/* Products Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Selected Products</label>
                <div className="bg-[#012A2D] rounded-lg p-3 min-h-[200px] mb-4">
                  {newSupplier.products.length === 0 ? (
                    <p className="text-gray-400 text-sm">No products selected</p>
                  ) : (
                    <div className="space-y-2">
                      {newSupplier.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#435355] p-2 rounded">
                          <span className="text-sm">{product}</span>
                          <button 
                            onClick={() => removeProductFromSupplier(product)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block text-sm font-medium mb-2">Available Products</label>
                <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                  {availableProducts.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => addProductToSupplier(product)}
                      disabled={newSupplier.products.includes(product)}
                      className="bg-[#012A2D] p-2 rounded text-sm hover:bg-[#2a3a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product}
                    </button>
                  ))}
                </div>
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
                onClick={handleAddSupplier}
                disabled={!newSupplier.name || !newSupplier.email || !newSupplier.address}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Supplier Modal */}
      {showViewModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Supplier Details</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Supplier ID</label>
                <p className="text-white font-semibold">#{selectedSupplier.id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                <p className="text-white">{selectedSupplier.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Contact Person</label>
                <p className="text-white">{selectedSupplier.contact}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                <p className="text-white">{selectedSupplier.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
                <p className="text-white">{selectedSupplier.phone}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Address</label>
                <p className="text-white text-sm">{selectedSupplier.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Products</label>
                <div className="bg-[#012A2D] rounded p-3">
                  {selectedSupplier.products.map((product, index) => (
                    <div key={index} className="text-white text-sm py-1">
                      • {product}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Rating</label>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="text-white">{selectedSupplier.rating}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedSupplier.status === "Active" 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-500 text-white"
                }`}>
                  {selectedSupplier.status}
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

      {/* Edit Supplier Modal */}
      {showEditModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Supplier #{selectedSupplier.id}</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supplier Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Supplier Name *</label>
                  <input
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Person</label>
                  <input
                    type="text"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address *</label>
                  <textarea
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>
              </div>

              {/* Products Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Selected Products</label>
                <div className="bg-[#012A2D] rounded-lg p-3 min-h-[200px] mb-4">
                  {newSupplier.products.length === 0 ? (
                    <p className="text-gray-400 text-sm">No products selected</p>
                  ) : (
                    <div className="space-y-2">
                      {newSupplier.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#435355] p-2 rounded">
                          <span className="text-sm">{product}</span>
                          <button 
                            onClick={() => removeProductFromSupplier(product)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block text-sm font-medium mb-2">Available Products</label>
                <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
                  {availableProducts.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => addProductToSupplier(product)}
                      disabled={newSupplier.products.includes(product)}
                      className="bg-[#012A2D] p-2 rounded text-sm hover:bg-[#2a3a3c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product}
                    </button>
                  ))}
                </div>
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
                onClick={handleUpdateSupplier}
                disabled={!newSupplier.name || !newSupplier.email || !newSupplier.address}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 