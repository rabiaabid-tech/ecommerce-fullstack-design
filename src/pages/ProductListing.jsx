//ProductListing.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Tech
import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 34.png";
import tech4 from "../assets/assets/Image/tech/image 32.png";
import tech5 from "../assets/assets/Image/tech/image 33.png";

// Interior
import interior1 from "../assets/assets/Image/interior/1.png";
import interior2 from "../assets/assets/Image/interior/3.png";

// Cloth
import cloth1 from "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";

// ✅ Same 10 products as ProductDetails
const allProducts = [
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
    id: 3,
    name: "Laptop Stand",
    price: "59.99",
    category: "Electronics",
    image: tech3,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "39.99",
    category: "Electronics",
    image: tech4,
  },
  {
    id: 5,
    name: "USB Hub",
    price: "29.99",
    category: "Electronics",
    image: tech5,
  },
  {
    id: 6,
    name: "Sofa Chair",
    price: "299.99",
    category: "Interior",
    image: interior1,
  },
  {
    id: 7,
    name: "Dining Table",
    price: "199.99",
    category: "Interior",
    image: interior2,
  },
  {
    id: 8,
    name: "T-Shirt",
    price: "19.99",
    category: "Clothing",
    image: cloth1,
  },
  {
    id: 9,
    name: "Casual Shirt",
    price: "29.99",
    category: "Clothing",
    image: cloth2,
  },
  {
    id: 10,
    name: "Jacket",
    price: "79.99",
    category: "Clothing",
    image: cloth3,
  },
];

export default function ProductListing() {
  // ✅ useState properly used
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const location = useLocation();

  // ✅ Navbar search se aaye toh auto fill ho
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  const categories = ["All", "Electronics", "Interior", "Clothing"];

  const filtered = allProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:border-blue-500"
          />

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-blue-700 text-white"
                    : "border border-gray-300 text-gray-600 hover:border-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="h-44 rounded-xl mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mb-1">{product.category}</p>
              <h3 className="font-semibold text-gray-800 mb-1">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-700 font-bold">
                  ${product.price}
                </span>
                {/* ✅ Link instead of <a> */}
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

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No products found for "{search}"
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-blue-700 underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}