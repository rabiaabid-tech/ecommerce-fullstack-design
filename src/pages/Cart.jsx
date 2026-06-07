import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);

  // 1. Load Cart Data from LocalStorage
  useEffect(() => {
    // 1. Load cart items from localStorage ALWAYS, regardless of login status
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQty = savedCart.map((item) => ({
      ...item,
      qty: item.qty || 1,
    }));
    setCartItems(cartWithQty);

    // 2. Fetch "Saved for later" items from backend dynamically
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        setSavedItems(data.slice(0, 4)); // Show only 4 items
        setLoadingSaved(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoadingSaved(false);
      });
  }, []);


  // Update Quantity Logic
  const handleQtyChange = (id, newQty) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: parseInt(newQty) } : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove Single Item
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove All Items
  const handleRemoveAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Dynamic Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.qty,
    0,
  );
  const discount = subtotal > 100 ? 60.0 : 0; // Flat $60 discount if subtotal > $100
  const tax = subtotal * 0.05; // 5% flat tax
  const total = Math.max(0, subtotal - discount + tax); // Prevent negative totals

  return (
    <div style={{ backgroundColor: "#F7FAFC" }} className="px-4 md:px-10 py-6">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          My cart ({cartItems.length})
        </h2>

        {/* ── MAIN 2-COLUMN ── */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
          {/* LEFT: Cart Items */}
          <div className="flex-1">
            <div className="bg-white border rounded-xl p-5">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div key={item.id}>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain border rounded-lg bg-gray-50 shrink-0 mix-blend-multiply"
                      />
                      {/* Details */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mb-0.5">
                          Category: {item.category}
                        </p>
                        <p className="text-xs text-gray-400 mb-2">
                          Seller: Verified Supplier
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-400 border border-red-400 px-3 py-0.5 rounded text-xs hover:bg-red-50 transition"
                          >
                            Remove
                          </button>
                          <button className="text-blue-600 border border-blue-600 px-3 py-0.5 rounded text-xs hover:bg-blue-50 transition">
                            Save for later
                          </button>
                        </div>
                      </div>
                      {/* Price + Qty */}
                      <div className="text-right shrink-0 mt-3 sm:mt-0">
                        <p className="font-bold text-gray-800 mb-2">
                          ${item.price}
                        </p>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQtyChange(item.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none bg-white cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                              Qty: {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {i < cartItems.length - 1 && (
                      <hr className="my-4 border-gray-100" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-3">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                ← Back to shop
              </Link>
              {cartItems.length > 0 && (
                <button
                  onClick={handleRemoveAll}
                  className="text-blue-600 text-sm hover:underline font-medium"
                >
                  Remove all
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full md:w-72 shrink-0 space-y-3">
            {/* Coupon */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Have a coupon?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="bg-white border border-gray-300 text-blue-600 px-4 py-1.5 rounded text-sm hover:bg-gray-50 transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-800 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount:</span>
                  <span className="text-red-500 font-medium">
                    - ${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax:</span>
                  <span className="text-green-500 font-medium">
                    + ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => alert("Checkout integration complete!")}
                className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition mb-3"
              >
                Checkout
              </button>
              {/* Payment icons */}
              <div className="flex justify-center gap-2 text-xl">
                <span title="Amex">💳</span>
                <span title="Mastercard">🔴</span>
                <span title="PayPal">🅿️</span>
                <span title="Visa">💙</span>
                <span title="Apple Pay">🍎</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BADGES ── */}
        <div className="bg-white border rounded-xl px-6 py-4 flex flex-wrap justify-around gap-4 mb-5 shadow-sm">
          {[
            {
              icon: "🔒",
              title: "Secure payment",
              desc: "Have you ever finally just",
            },
            {
              icon: "💬",
              title: "Customer support",
              desc: "Have you ever finally just",
            },
            {
              icon: "🚚",
              title: "Free delivery",
              desc: "Have you ever finally just",
            },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xl text-gray-500">{b.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{b.title}</p>
                <p className="text-xs text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SAVED FOR LATER (Dynamically Fetched) ── */}
        <div className="bg-white border rounded-xl p-5 mb-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Saved for later</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loadingSaved ? (
              <p className="text-sm text-gray-500">Loading saved items...</p>
            ) : (
              savedItems.map((p) => (
                <div
                  key={p.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-white"
                >
                  <div className="h-36 flex items-center justify-center bg-white rounded-lg mb-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <p className="font-bold text-gray-800 text-base mb-1">
                    ${p.price}
                  </p>
                  <p className="text-xs text-gray-500 mb-3 leading-tight line-clamp-2 h-8">
                    {p.name}
                  </p>
                  <Link
                    to={`/product/${p.id}`}
                    className="w-full flex items-center justify-center gap-2 text-blue-600 border border-gray-200 bg-white py-1.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition"
                  >
                    🛒 Move to cart
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── DISCOUNT BANNER ── */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white font-bold text-2xl mb-2">
              Super discount on more than 100 USD
            </h3>
            <p className="text-blue-100 text-sm">
              Have you ever finally just write dummy info
            </p>
          </div>
          <Link
            to="/products"
            className="bg-orange-500 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition whitespace-nowrap relative z-10"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
