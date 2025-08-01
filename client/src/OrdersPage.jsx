import React, { useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([
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

  // State for modal and form
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    email: "",
    phone: "",
    address: "",
    items: [],
    shipping: "Standard"
  });

  // Available products for order
  const availableProducts = [
    { name: "Gaming Laptop", price: 1299.99, category: "Electronics" },
    { name: "Gaming Mouse", price: 79.99, category: "Electronics" },
    { name: "Wireless Headphones", price: 89.99, category: "Electronics" },
    { name: "Mechanical Keyboard", price: 149.99, category: "Electronics" },
    { name: "Mouse Pad", price: 19.99, category: "Accessories" },
    { name: "USB Cable", price: 9.99, category: "Accessories" },
    { name: "Webcam", price: 59.99, category: "Electronics" },
    { name: "External Hard Drive", price: 89.99, category: "Storage" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return "bg-blue-500 text-white";
      case "Shipped": return "bg-yellow-500 text-black";
      case "Delivered": return "bg-green-500 text-white";
      case "Cancelled": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  // Helper functions
  const addItemToOrder = (product) => {
    const existingItem = newOrder.items.find(item => item.name === product.name);
    if (existingItem) {
      setNewOrder(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }));
    } else {
      setNewOrder(prev => ({
        ...prev,
        items: [...prev.items, { name: product.name, quantity: 1, price: product.price }]
      }));
    }
  };

  const removeItemFromOrder = (itemName) => {
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.filter(item => item.name !== itemName)
    }));
  };

  const updateItemQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      removeItemFromOrder(itemName);
      return;
    }
    setNewOrder(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.name === itemName 
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    }));
  };

  const calculateTotal = () => {
    return newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.email || newOrder.items.length === 0) {
      alert("Please fill in all required fields and add at least one item");
      return;
    }

    const newOrderData = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customer: newOrder.customer,
      email: newOrder.email,
      phone: newOrder.phone,
      address: newOrder.address,
      items: newOrder.items,
      total: calculateTotal(),
      status: "Processing",
      date: new Date().toISOString().split('T')[0],
      shipping: newOrder.shipping
    };

    setOrders(prev => [newOrderData, ...prev]);
    setNewOrder({
      customer: "",
      email: "",
      phone: "",
      address: "",
      items: [],
      shipping: "Standard"
    });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#012A2D] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            + Add Order
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
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "Processing").length}</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Shipped</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "Shipped").length}</p>
              </div>
              <div className="text-3xl">🚚</div>
            </div>
          </div>
          
          <div className="bg-[#435355] p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Delivered</p>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === "Delivered").length}</p>
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

        {/* Add Order Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#435355] rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Order</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Customer Name *</label>
                      <input
                        type="text"
                        value={newOrder.customer}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, customer: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#012A2D] border border-gray-600 rounded text-white"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={newOrder.email}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#012A2D] border border-gray-600 rounded text-white"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newOrder.phone}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#012A2D] border border-gray-600 rounded text-white"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <textarea
                        value={newOrder.address}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#012A2D] border border-gray-600 rounded text-white"
                        placeholder="Enter shipping address"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Shipping Method</label>
                      <select
                        value={newOrder.shipping}
                        onChange={(e) => setNewOrder(prev => ({ ...prev, shipping: e.target.value }))}
                        className="w-full px-3 py-2 bg-[#012A2D] border border-gray-600 rounded text-white"
                      >
                        <option value="Standard">Standard Shipping</option>
                        <option value="Express">Express Shipping</option>
                        <option value="Overnight">Overnight Shipping</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Product Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Selection</h3>
                  <div className="space-y-4">
                    {/* Available Products */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Available Products</label>
                      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                        {availableProducts.map((product) => (
                          <button
                            key={product.name}
                            onClick={() => addItemToOrder(product)}
                            className="flex justify-between items-center p-2 bg-[#012A2D] rounded hover:bg-[#012A2D] hover:bg-opacity-80 transition-colors"
                          >
                            <span className="text-sm">{product.name}</span>
                            <span className="text-sm text-gray-300">${product.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Items */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Selected Items</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {newOrder.items.map((item) => (
                          <div key={item.name} className="flex items-center justify-between p-2 bg-[#012A2D] rounded">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-300">${item.price} each</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateItemQuantity(item.name, e.target.value)}
                                className="w-16 px-2 py-1 bg-[#435355] border border-gray-600 rounded text-white text-sm"
                              />
                              <button
                                onClick={() => removeItemFromOrder(item.name)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        {newOrder.items.length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-4">No items selected</p>
                        )}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold text-yellow-400">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-600">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrder}
                  className="px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 