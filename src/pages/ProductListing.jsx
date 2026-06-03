import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import tech1 from "../assets/assets/Image/tech/image 23.png";
import tech2 from "../assets/assets/Image/tech/image 29.png";
import tech3 from "../assets/assets/Image/tech/image 34.png";
import tech4 from "../assets/assets/Image/tech/image 32.png";
import tech5 from "../assets/assets/Image/tech/image 33.png";
import interior1 from "../assets/assets/Image/interior/1.png";
import interior2 from "../assets/assets/Image/interior/3.png";
import cloth1 from
  "../assets/assets/Layout/alibaba/Image/cloth/2 1.png";
import cloth2 from
  "../assets/assets/Layout/alibaba/Image/cloth/image 24.png";
import cloth3 from
  "../assets/assets/Layout/alibaba/Image/cloth/image 30.png";

const allProducts = [
  { id:1, name:"Wireless Headphones", price:"49.99",
    oldPrice:"128.00", category:"Electronics",
    rating:4, reviews:7.5, image:tech1 },
  { id:2, name:"Smart Watch", price:"129.99",
    oldPrice:"128.00", category:"Electronics",
    rating:3, reviews:5.9, image:tech2 },
  { id:3, name:"Laptop Stand", price:"59.99",
    oldPrice:"128.00", category:"Electronics",
    rating:4, reviews:7.5, image:tech3 },
  { id:4, name:"Bluetooth Speaker", price:"39.99",
    oldPrice:"128.00", category:"Electronics",
    rating:4, reviews:7.5, image:tech4 },
  { id:5, name:"USB Hub", price:"29.99",
    oldPrice:"128.00", category:"Electronics",
    rating:4, reviews:7.5, image:tech5 },
  { id:6, name:"Sofa Chair", price:"299.99",
    oldPrice:"350.00", category:"Interior",
    rating:4, reviews:8.0, image:interior1 },
  { id:7, name:"Dining Table", price:"199.99",
    oldPrice:"250.00", category:"Interior",
    rating:4, reviews:7.0, image:interior2 },
  { id:8, name:"T-Shirt", price:"19.99",
    oldPrice:"35.00", category:"Clothing",
    rating:4, reviews:7.5, image:cloth1 },
  { id:9, name:"Casual Shirt", price:"29.99",
    oldPrice:"50.00", category:"Clothing",
    rating:4, reviews:7.5, image:cloth2 },
  { id:10, name:"Jacket", price:"79.99",
    oldPrice:"120.00", category:"Clothing",
    rating:4, reviews:7.5, image:cloth3 },
];

export default function ProductListing() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  const categories = [
    "All", "Electronics", "Interior", "Clothing"
  ];

  const filtered = allProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ backgroundColor: "#F7FAFC" }}
      className="px-4 md:px-10 py-4">
      <div className="max-w-[1440px] mx-auto">

        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          {" > "}
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          {" > "}
          <span className="text-gray-600">All Products</span>
        </p>

        <div className="flex gap-5">

          {/* ── LEFT SIDEBAR ── */}
          <div className="hidden md:block w-56 shrink-0 space-y-3">

            {/* Category */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                  Category
                </h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {categories.map((cat) => (
                <p key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm py-1 cursor-pointer
                  hover:text-blue-600
                  ${activeCategory === cat
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"}`}>
                  {cat}
                </p>
              ))}
              <p className="text-blue-600 text-xs mt-1 cursor-pointer">
                See all
              </p>
            </div>

            {/* Brands */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                  Brands
                </h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {["Samsung","Apple","Huawei",
                "Pocco","Lenovo"].map((b) => (
                <label key={b}
                  className="flex items-center gap-2 text-sm
                  text-gray-500 py-0.5 cursor-pointer">
                  <input type="checkbox"
                    className="accent-blue-600" />
                  {b}
                </label>
              ))}
              <p className="text-blue-600 text-xs mt-2 cursor-pointer">
                See all
              </p>
            </div>

            {/* Features */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                  Features
                </h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {["Metallic","Plastic cover",
                "8GB Ram","Super power","Large Memory"].map((f) => (
                <label key={f}
                  className="flex items-center gap-2 text-sm
                  text-gray-500 py-0.5 cursor-pointer">
                  <input type="checkbox"
                    className="accent-blue-600" />
                  {f}
                </label>
              ))}
              <p className="text-blue-600 text-xs mt-2 cursor-pointer">
                See all
              </p>
            </div>

            {/* Collapsed filters */}
            {["Price range","Condition",
              "Ratings","Manufacturer"].map((f) => (
              <div key={f}
                className="bg-white border rounded-xl p-4
                flex justify-between items-center cursor-pointer
                hover:bg-gray-50">
                <h3 className="font-semibold text-sm text-gray-800">
                  {f}
                </h3>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
            ))}
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex-1">

            {/* Top Bar */}
            <div className="bg-white border rounded-xl px-4 py-3
              flex flex-wrap justify-between items-center gap-3 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">
                  {filtered.length} items
                </span>
                {" "}in{" "}
                <span className="font-semibold text-gray-800">
                  {activeCategory === "All"
                    ? "All Products" : activeCategory}
                </span>
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-lg
                  px-3 py-1 text-sm focus:outline-none
                  focus:border-blue-500 w-40"
                />
                {/* Verified */}
                <label className="flex items-center gap-1
                  text-sm text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) =>
                      setVerifiedOnly(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Verified only
                </label>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded
                  px-2 py-1 text-sm focus:outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                {/* View Toggle */}
                <div className="flex border border-gray-300
                  rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2 py-1 text-sm transition
                    ${viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-50"}`}>
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-2 py-1 text-sm transition
                    ${viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-50"}`}>
                    ≡
                  </button>
                </div>
              </div>
            </div>

            {/* ── GRID VIEW ── */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2
                md:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <div key={p.id}
                    className="bg-white border rounded-xl p-4
                    hover:shadow-md transition relative">
                    {/* Wishlist */}
                    <button className="absolute top-3 right-3
                      text-gray-300 hover:text-red-400 text-lg">
                      ♡
                    </button>
                    <div className="h-48 flex items-center
                      justify-center bg-gray-50 rounded-lg mb-3">
                      <img src={p.image} alt={p.name}
                        className="h-full w-full object-contain" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800">
                        ${p.price}
                      </span>
                      <span className="text-gray-400
                        line-through text-sm">
                        ${p.oldPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {"★★★★☆".split("").map((s, i) => (
                        <span key={i}
                          className="text-yellow-400 text-xs">
                          {s}
                        </span>
                      ))}
                      <span className="text-gray-400 text-xs ml-1">
                        {p.reviews}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {p.name}
                    </p>
                    <Link to={`/product/${p.id}`}
                      className="block text-center bg-blue-600
                      text-white py-1.5 rounded-lg text-sm
                      hover:bg-blue-700 transition">
                      View details
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* ── LIST VIEW ── */}
            {viewMode === "list" && (
              <div className="space-y-3">
                {filtered.map((p) => (
                  <div key={p.id}
                    className="bg-white border rounded-xl p-4
                    flex items-center gap-4 hover:shadow-md
                    transition">
                    <div className="w-28 h-28 flex items-center
                      justify-center bg-gray-50 rounded-lg shrink-0">
                      <img src={p.image} alt={p.name}
                        className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 mb-1">
                        ${p.price}
                        <span className="text-gray-400
                          line-through text-sm ml-2">
                          ${p.oldPrice}
                        </span>
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        {"★★★★☆".split("").map((s, i) => (
                          <span key={i}
                            className="text-yellow-400 text-xs">
                            {s}
                          </span>
                        ))}
                        <span className="text-gray-400 text-xs mx-1">
                          {p.reviews}
                        </span>
                        <span className="text-gray-300 text-xs">•</span>
                        <span className="text-gray-400 text-xs ml-1">
                          154 orders
                        </span>
                        <span className="text-green-500
                          text-xs ml-2 font-medium">
                          Free Shipping
                        </span>
                      </div>
                      <p className="font-medium text-gray-700 mb-1">
                        {p.name}
                      </p>
                      <p className="text-gray-400 text-xs mb-2">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                      </p>
                      <Link to={`/product/${p.id}`}
                        className="text-blue-600 text-sm
                        hover:underline">
                        View details
                      </Link>
                    </div>
                    <button className="text-gray-300
                      hover:text-red-400 text-xl self-start">
                      ♡
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white
                rounded-xl border">
                <p className="text-gray-400 text-lg mb-3">
                  No products found
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="text-blue-600 text-sm hover:underline">
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex justify-end items-center
                gap-2 mt-6">
                <span className="text-sm text-gray-500">Show</span>
                <select className="border border-gray-300 rounded
                  px-2 py-1 text-sm">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <button className="px-3 py-1 border border-gray-300
                  rounded text-sm hover:bg-gray-50">‹</button>
                <button className="px-3 py-1 bg-blue-600
                  text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300
                  rounded text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300
                  rounded text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300
                  rounded text-sm hover:bg-gray-50">›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}