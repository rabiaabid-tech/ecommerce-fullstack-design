import { Link } from "react-router-dom";
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";
import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 32.png";
import tech4 from "../assets/assets/Image/tech/image 33.png";

const cartItems = [
  {
    id: 1,
    name: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue, Material: Plastic",
    seller: "Artel Market",
    price: 78.99,
    qty: 9,
    image: cloth1,
  },
  {
    id: 2,
    name: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue, Material: Plastic",
    seller: "Best factory LLC",
    price: 39.0,
    qty: 3,
    image: cloth2,
  },
  {
    id: 3,
    name: "T-shirts with multiple colors, for men and lady",
    details: "Size: medium, Color: blue, Material: Plastic",
    seller: "Artel Market",
    price: 170.5,
    qty: 1,
    image: cloth3,
  },
];

const savedItems = [
  {
    id: 1,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image: tech1,
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image: tech2,
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image: tech3,
  },
  {
    id: 4,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image: tech4,
  },
];

export default function Cart() {
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
              {cartItems.map((item, i) => (
                <div key={item.id}>
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain
                      border rounded-lg bg-gray-50 shrink-0"
                    />
                    {/* Details */}
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium
                        text-gray-800 mb-1"
                      >
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mb-0.5">
                        {item.details}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        Seller: {item.seller}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="text-red-400
                          border border-red-400 px-3 py-0.5
                          rounded text-xs hover:bg-red-50"
                        >
                          Remove
                        </button>
                        <button
                          className="text-blue-600
                          border border-blue-600 px-3 py-0.5
                          rounded text-xs hover:bg-blue-50"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                    {/* Price + Qty */}
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-800 mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <select
                        className="border border-gray-300
                        rounded px-2 py-1 text-xs
                        focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} selected={n === item.qty}>
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
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-3">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-blue-600
                text-white px-5 py-2 rounded-lg text-sm
                hover:bg-blue-700"
              >
                ← Back to shop
              </Link>
              <button
                className="text-blue-600 text-sm
                hover:underline"
              >
                Remove all
              </button>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full md:w-72 shrink-0 space-y-3">
            {/* Coupon */}
            <div className="bg-white border rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Have a coupon?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add coupon"
                  className="flex-1 border border-gray-300 rounded
                  px-3 py-1.5 text-sm focus:outline-none
                  focus:border-blue-500"
                />
                <button
                  className="bg-blue-600 text-white px-4
                  py-1.5 rounded text-sm hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white border rounded-xl p-4">
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="text-gray-800 font-medium">$1403.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount:</span>
                  <span className="text-red-500 font-medium">- $60.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax:</span>
                  <span className="text-green-500 font-medium">+ $14.00</span>
                </div>
                <div
                  className="flex justify-between font-bold
                  text-base border-t border-gray-100 pt-3"
                >
                  <span>Total:</span>
                  <span>$1357.97</span>
                </div>
              </div>
              <button
                className="w-full bg-green-500 text-white
                py-3 rounded-xl font-semibold hover:bg-green-600
                transition mb-3"
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
        <div
          className="bg-white border rounded-xl px-6 py-4
          flex flex-wrap justify-around gap-4 mb-5"
        >
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
              <span className="text-2xl text-gray-400">{b.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-700">{b.title}</p>
                <p className="text-xs text-gray-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SAVED FOR LATER ── */}
        <div className="bg-white border rounded-xl p-5 mb-5">
          <h3 className="font-semibold text-gray-800 mb-4">Saved for later</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedItems.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl p-3
                hover:shadow-md transition"
              >
                <div
                  className="h-36 flex items-center
                  justify-center bg-gray-50 rounded-lg mb-2"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="font-bold text-gray-800 text-sm mb-1">
                  ${p.price}
                </p>
                <p
                  className="text-xs text-gray-500 mb-2
                  leading-tight"
                >
                  {p.name}
                </p>
                <button
                  className="w-full flex items-center
                  justify-center gap-1 text-blue-600 text-xs
                  hover:underline"
                >
                  🛒 Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── DISCOUNT BANNER ── */}
        <div
          className="bg-blue-600 rounded-xl p-6
          flex justify-between items-center"
        >
          <div>
            <h3 className="text-white font-bold text-lg mb-1">
              Super discount on more than 100 USD
            </h3>
            <p className="text-blue-200 text-sm">
              Have you ever finally just write dummy info
            </p>
          </div>
          <Link
            to="/products"
            className="bg-orange-400 text-white px-6 py-2
            rounded-lg font-semibold hover:bg-orange-500
            whitespace-nowrap"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
