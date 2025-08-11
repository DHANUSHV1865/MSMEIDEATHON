import { useState, useEffect } from "react";
import { useNotifications } from "./components/NotificationContext";

export default function ProductManagement() {
  const { addNotification } = useNotifications();
  const [products, setProducts] = useState([
    { id: 1, name: "Rice Bags (25kg)", price: 1200, stock: 50, category: "Grains", supplier: "Bulk Food Suppliers" },
    { id: 2, name: "Cooking Oil (5L)", price: 450, stock: 30, category: "Oils", supplier: "Fresh Grocery Supplies" },
    { id: 3, name: "Sugar (1kg)", price: 42, stock: 100, category: "Groceries", supplier: "Bulk Food Suppliers" },
    { id: 4, name: "Wheat Flour (10kg)", price: 380, stock: 25, category: "Grains", supplier: "Bulk Food Suppliers" },
    { id: 5, name: "Dal (Lentils) 1kg", price: 85, stock: 80, category: "Pulses", supplier: "Fresh Grocery Supplies" },
    { id: 6, name: "Tea Powder (500g)", price: 180, stock: 60, category: "Beverages", supplier: "Fresh Grocery Supplies" },
    { id: 7, name: "Mustard Oil (1L)", price: 120, stock: 40, category: "Oils", supplier: "Fresh Grocery Supplies" },
    { id: 8, name: "Basmati Rice (5kg)", price: 650, stock: 35, category: "Grains", supplier: "Bulk Food Suppliers" },
  ]);

  const [suppliers] = useState([
    { id: 1, name: "Fresh Grocery Supplies", products: ["Milk", "Bread", "Eggs", "Vegetables", "Cooking Oil", "Dal", "Tea Powder", "Mustard Oil"] },
    { id: 2, name: "Organic Food Co.", products: ["Organic Fruits", "Organic Vegetables", "Organic Dairy"] },
    { id: 3, name: "Bulk Food Suppliers", products: ["Rice", "Pasta", "Flour", "Sugar", "Wheat Flour", "Basmati Rice"] }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    document.title = "SimpleShelf - Product Management";
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const openPurchaseModal = () => {
    setShowPurchaseModal(true);
    setPurchaseItems([]);
    setSelectedSupplier("");
  };

  const addItemToPurchase = (item) => {
    const exists = purchaseItems.find((p) => p.name === item);
    if (exists) {
      setPurchaseItems(purchaseItems.map((p) =>
        p.name === item ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setPurchaseItems([...purchaseItems, { name: item, quantity: 1, price: 0 }]);
    }
  };

  const removeItemFromPurchase = (itemName) => {
    setPurchaseItems(purchaseItems.filter((p) => p.name !== itemName));
  };

  const updatePurchaseQuantity = (itemName, quantity) => {
    setPurchaseItems(purchaseItems.map((p) =>
      p.name === itemName ? { ...p, quantity: Math.max(0, quantity) } : p
    ));
  };

  const updatePurchasePrice = (itemName, price) => {
    setPurchaseItems(purchaseItems.map((p) =>
      p.name === itemName ? { ...p, price: Math.max(0, price) } : p
    ));
  };

  const handlePurchase = () => {
    if (selectedSupplier && purchaseItems.length > 0) {
      // Add purchased items to inventory
      const newProducts = [...products];
      purchaseItems.forEach((item) => {
        const existingProduct = newProducts.find((p) => p.name === item.name);
        if (existingProduct) {
          const before = existingProduct.stock;
          existingProduct.stock += item.quantity;
          const after = existingProduct.stock;

          if (before < 20 && after >= 20) {
            addNotification({
              title: `Restocked: ${existingProduct.name}`,
              message: `${existingProduct.name} is now sufficiently stocked (${after} units).`,
              category: "System Update",
              details: `Previous stock: ${before}. Added: ${item.quantity}.`,
              read: false,
            });
          }
        } else {
          newProducts.push({
            id: newProducts.length + 1,
            name: item.name,
            price: item.price,
            stock: item.quantity,
            category: "New",
            supplier: selectedSupplier
          });
          addNotification({
            title: `New Product Added: ${item.name}`,
            message: `${item.name} added to inventory with ${item.quantity} units.`,
            category: "System Update",
            details: `Source supplier: ${selectedSupplier}.`,
            read: false,
          });
        }
      });
      setProducts(newProducts);
      setShowPurchaseModal(false);
      setPurchaseItems([]);
      setSelectedSupplier("");
    }
  };

  const getSupplierProducts = () => {
    if (!selectedSupplier) return [];
    const supplier = suppliers.find((s) => s.name === selectedSupplier);
    return supplier ? supplier.products : [];
  };

  const totalPurchaseCost = purchaseItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#435355]">
      {/* Header with Purchase Button */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-white">Product Management</h1>
        <div className="flex gap-4">
          <button
            onClick={openPurchaseModal}
            className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded font-semibold"
          >
            📦 Buy from Supplier
          </button>
          <select
            className="bg-white text-black px-3 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product and Cart */}
      <div className="flex flex-1 px-4 gap-6">
        {/* Products */}
        <div className="w-3/4 grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative p-4 rounded-lg shadow-lg flex flex-col items-center justify-between border border-gray-300 bg-[#012A2D]"
              style={{ minHeight: "180px" }}
            >
              {/* Stock Badge */}
              <div className="absolute top-2 right-2 bg-white text-[#012A2D] text-xs font-bold px-2 py-1 rounded">
                {product.stock} left
              </div>

              <h3 className="text-lg font-bold text-white">{product.name}</h3>
              <p className="text-yellow-300 font-bold">₹{product.price}</p>
              <p className="text-xs text-gray-300 mb-2">Supplier: {product.supplier}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-1 px-3 rounded text-sm"
              >
                + Add
              </button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg border-2 border-[#435355]">
          <h2 className="text-lg font-bold mb-3 text-[#012A2D]">🛒 Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-2 border-b pb-1">
                    <div className="text-sm">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-xs text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-300 rounded-l text-sm">-</button>
                      <span className="px-2 text-sm font-bold text-black">{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-300 rounded-r text-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t pt-3">
                <h3 className="font-bold text-base">Total: ₹{totalBill.toLocaleString("en-IN")}</h3>
                <button onClick={clearCart} className="w-full mt-2 py-1 rounded font-bold text-sm bg-red-500 text-white hover:bg-red-400">Clear Cart</button>
                <button className="w-full mt-2 py-1 rounded font-bold text-sm bg-[#012A2D] text-white border-2 border-[#012A2D]">Checkout</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Purchase from Supplier Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#435355] rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Purchase from Supplier</h2>
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supplier Selection and Products */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Select Supplier</label>
                  <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="w-full p-3 bg-[#012A2D] rounded-lg text-white border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Choose a supplier...</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.name}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSupplier && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Available Products</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                      {getSupplierProducts().map((product, index) => (
                        <button
                          key={index}
                          onClick={() => addItemToPurchase(product)}
                          className="bg-[#012A2D] p-3 rounded text-sm hover:bg-[#2a3a3c] transition-colors text-white"
                        >
                          {product}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Items */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Purchase Items</label>
                <div className="bg-[#012A2D] rounded-lg p-4 min-h-[300px]">
                  {purchaseItems.length === 0 ? (
                    <p className="text-gray-400 text-sm">No items selected for purchase</p>
                  ) : (
                    <div className="space-y-3">
                      {purchaseItems.map((item, index) => (
                        <div key={index} className="bg-[#435355] p-3 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">{item.name}</span>
                            <button 
                              onClick={() => removeItemFromPurchase(item.name)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-gray-300">Quantity:</label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updatePurchaseQuantity(item.name, parseInt(e.target.value) || 0)}
                                className="w-full p-1 bg-[#012A2D] rounded text-white text-sm border border-gray-600"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-300">Price per unit:</label>
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => updatePurchasePrice(item.name, parseFloat(e.target.value) || 0)}
                                className="w-full p-1 bg-[#012A2D] rounded text-white text-sm border border-gray-600"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-300 mt-1">
                            Total: ₹{(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-white">Total Cost: ₹{totalPurchaseCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={!selectedSupplier || purchaseItems.length === 0}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
