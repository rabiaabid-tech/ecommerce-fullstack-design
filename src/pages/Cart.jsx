//Cart.jsx
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Your Cart 🛒</h2>

        {/* Empty Cart */}
        <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
          <span className="text-6xl mb-4 block">🛒</span>
          <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
          >
            Start Shopping
          </Link>
        </div>

        {/* Total */}
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold text-gray-800">
            Total: <span className="text-blue-700">$0.00</span>
          </p>
          <button className="mt-3 bg-gray-300 text-gray-500 px-8 py-3 rounded-full font-semibold cursor-not-allowed">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
