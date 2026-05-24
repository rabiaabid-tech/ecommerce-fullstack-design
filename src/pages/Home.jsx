//Home.jsx
import { Link } from "react-router-dom";

import heroImage from "../assets/assets/Image/backgrounds/Group 982.png";
import bannerImage from "../assets/assets/Image/backgrounds/Banner-board-800x420 2.png";

import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import interior1 from "../assets/assets/Image/interior/1.png";
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "49.99",
    category: "Electronics",
    image: tech1,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "129.99",
    category: "Electronics",
    image: tech2,
  },
  {
    id: 6,
    name: "Sofa Chair",
    price: "299.99",
    category: "Interior",
    image: interior1,
  },
  {
    id: 8,
    name: "T-Shirt",
    price: "19.99",
    category: "Clothing",
    image: cloth1,
  },
];

export default function Home() {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="bg-blue-50 px-6 md:px-16 py-10 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-10">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-blue-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              Best Deals Online
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Shop Everything <br /> You Love
            </h1>
            <p className="text-gray-500 mb-8 text-sm md:text-base">
              Fast shipping & easy returns guaranteed.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Shop Now →
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <img
              src={heroImage}
              alt="Hero Banner"
              className="w-full h-56 md:h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ===== BANNER STRIP ===== */}
      <section className="px-6 md:px-16 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-44 md:h-64 rounded-2xl overflow-hidden">
            <img
              src={bannerImage}
              alt="Promo Banner"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl" />
            {/* Text on banner */}
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div>
                <p className="text-white text-xs md:text-sm font-semibold uppercase tracking-wide mb-1">
                  Limited Offer
                </p>
                <h3 className="text-white text-xl md:text-3xl font-bold mb-3">
                  Up to 50% Off <br className="hidden md:block" /> on
                  Electronics
                </h3>
                <Link
                  to="/products"
                  className="inline-block bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-blue-700 text-sm hover:underline"
            >
              View All →
            </Link>
          </div>

          {/* Grid - 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="bg-gray-50 h-40 md:h-44 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-700 font-bold">
                    ${product.price}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="bg-blue-50 px-6 md:px-16 py-10 mt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "🛡️", title: "Secure Payment", desc: "100% safe checkout" },
            { icon: "🎧", title: "24/7 Support", desc: "Always here to help" },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{f.icon}</span>
              <h4 className="font-semibold text-gray-800 text-sm">{f.title}</h4>
              <p className="text-gray-400 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
