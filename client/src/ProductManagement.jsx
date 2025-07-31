import { useState, useEffect } from "react";

export default function ProductManagement() {
  const [products] = useState([
    { id: 1, name: "Rice Bags (25kg)", price: 1200, stock: 50, category: "Grains" },
    { id: 2, name: "Cooking Oil (5L)", price: 450, stock: 30, category: "Oils" },
    { id: 3, name: "Sugar (1kg)", price: 42, stock: 100, category: "Groceries" },
    { id: 4, name: "Wheat Flour (10kg)", price: 380, stock: 25, category: "Grains" },
    { id: 5, name: "Dal (Lentils) 1kg", price: 85, stock: 80, category: "Pulses" },
    { id: 6, name: "Tea Powder (500g)", price: 180, stock: 60, category: "Beverages" },
    { id: 7, name: "Mustard Oil (1L)", price: 120, stock: 40, category: "Oils" },
    { id: 8, name: "Basmati Rice (5kg)", price: 650, stock: 35, category: "Grains" },
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "SimpleShelf - Product Management";
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #012A2D, #435355)",
      }}
    >
      {/* Header with Website Name and Category Filter */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#012A2D] text-white">
        <h1 className="text-2xl font-bold font-serif">SimpleShelf</h1>

        {/* Dropdown for category */}
        <select
          className="bg-white text-black px-3 py-1 rounded"
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

      {/* Main Layout */}
      <div className="flex flex-1 px-4 gap-6 mt-4">
        {/* Product List */}
        <div className="w-3/4 grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative p-4 rounded-lg shadow-lg flex flex-col items-center border border-gray-300"
              style={{
                backgroundColor: "#435355",
                minHeight: "200px",
              }}
            >
              {/* Stock badge */}
              <div
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold"
                style={{
                  backgroundColor: "white",
                  color: "#012A2D",
                }}
              >
                {product.stock} left
              </div>

              {/* Center Name & Price */}
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-yellow-300 font-bold text-md">
                  ₹{product.price}
                </p>
              </div>

              {/* Add Button */}
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
        <div
          className="w-1/4 bg-white p-4 rounded-lg shadow-lg flex flex-col"
          style={{
            border: "2px solid #435355",
            maxHeight: "85vh",
          }}
        >
          <h2 className="text-lg font-bold mb-3" style={{ color: "#012A2D" }}>
            🛒 Cart ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2 border-b pb-1"
                  >
                    <div className="text-sm">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-xs text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-300 rounded-l text-sm"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-gray-300 rounded-r text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Actions */}
              <div className="mt-3 border-t pt-3">
                <h3 className="font-bold text-base">
                  Total: ₹{totalBill.toLocaleString("en-IN")}
                </h3>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full mt-2 py-1 rounded font-bold text-sm bg-red-500 text-white hover:bg-red-400"
                >
                  Clear Cart
                </button>

                {/* Checkout */}
                <button
                  className="w-full mt-2 py-1 rounded font-bold text-sm"
                  style={{
                    backgroundColor: "#012A2D",
                    color: "white",
                    border: "2px solid #012A2D",
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
