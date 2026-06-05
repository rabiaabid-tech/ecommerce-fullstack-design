import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductListing() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  // Database states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Extract search parameter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, [location.search]);

  // Fetch data dynamically from FastAPI backend
  useEffect(() => {
    setLoading(true);
    let apiUrl = "http://127.0.0.1:8000/products?";

    if (search) {
      apiUrl += `search=${search}&`;
    }
    if (activeCategory !== "All") {
      apiUrl += `category=${activeCategory}`;
    }

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, [search, activeCategory]);

  const categories = ["All", "Electronics", "Interior", "Clothing"];

  return (
    <div style={{ backgroundColor: "#F7FAFC" }} className="px-4 md:px-10 py-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb Navigation */}
        <p className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
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
            {/* Category Filter */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                  Category
                </h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {categories.map((cat) => (
                <p
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm py-1 cursor-pointer hover:text-blue-600
                  ${activeCategory === cat ? "text-blue-600 font-medium" : "text-gray-500"}`}
                >
                  {cat}
                </p>
              ))}
              <p className="text-blue-600 text-xs mt-1 cursor-pointer">
                See all
              </p>
            </div>

            {/* Brands Filter */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">Brands</h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((b) => (
                <label
                  key={b}
                  className="flex items-center gap-2 text-sm text-gray-500 py-0.5 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  {b}
                </label>
              ))}
              <p className="text-blue-600 text-xs mt-2 cursor-pointer">
                See all
              </p>
            </div>

            {/* Features Filter */}
            <div className="bg-white border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-sm text-gray-800">
                  Features
                </h3>
                <span className="text-gray-400 text-xs">▲</span>
              </div>
              {[
                "Metallic",
                "Plastic cover",
                "8GB Ram",
                "Super power",
                "Large Memory",
              ].map((f) => (
                <label
                  key={f}
                  className="flex items-center gap-2 text-sm text-gray-500 py-0.5 cursor-pointer"
                >
                  <input type="checkbox" className="accent-blue-600" />
                  {f}
                </label>
              ))}
              <p className="text-blue-600 text-xs mt-2 cursor-pointer">
                See all
              </p>
            </div>

            {/* Collapsed Filters */}
            {["Price range", "Condition", "Ratings", "Manufacturer"].map(
              (f) => (
                <div
                  key={f}
                  className="bg-white border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-sm text-gray-800">{f}</h3>
                  <span className="text-gray-400 text-xs">▼</span>
                </div>
              ),
            )}
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex-1">
            {/* Top Control Bar */}
            <div className="bg-white border rounded-xl px-4 py-3 flex flex-wrap justify-between items-center gap-3 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">
                  {products.length} items
                </span>{" "}
                in{" "}
                <span className="font-semibold text-gray-800">
                  {activeCategory === "All" ? "All Products" : activeCategory}
                </span>
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-blue-500 w-40"
                />

                {/* Verified Dummy Checkbox */}
                <label className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer">
                  <input type="checkbox" className="accent-blue-600" />
                  Verified only
                </label>

                {/* Sort Dummy Select */}
                <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-2 py-1 text-sm transition ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-2 py-1 text-sm transition ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    ≡
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-20 text-gray-500">
                Loading products from database...
              </div>
            ) : (
              <>
                {/* ── GRID VIEW ── */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border rounded-xl p-4 hover:shadow-md transition relative"
                      >
                        <button className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-lg">
                          ♡
                        </button>
                        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800">
                            ${p.price}
                          </span>
                          {p.old_price && (
                            <span className="text-gray-400 line-through text-sm">
                              ${p.old_price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          {"★★★★☆".split("").map((s, i) => (
                            <span key={i} className="text-yellow-400 text-xs">
                              {s}
                            </span>
                          ))}
                          <span className="text-gray-400 text-xs ml-1">
                            {p.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{p.name}</p>
                        <Link
                          to={`/product/${p.id}`}
                          className="block text-center bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          View details
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── LIST VIEW ── */}
                {viewMode === "list" && (
                  <div className="space-y-3">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition"
                      >
                        <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-lg shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 mb-1">
                            ${p.price}
                            {p.old_price && (
                              <span className="text-gray-400 line-through text-sm ml-2">
                                ${p.old_price}
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-1 mb-1">
                            {"★★★★☆".split("").map((s, i) => (
                              <span key={i} className="text-yellow-400 text-xs">
                                {s}
                              </span>
                            ))}
                            <span className="text-gray-400 text-xs mx-1">
                              {p.rating}
                            </span>
                            <span className="text-gray-300 text-xs">•</span>
                            <span className="text-gray-400 text-xs ml-1">
                              {p.orders_count} orders
                            </span>
                            {p.free_shipping && (
                              <span className="text-green-500 text-xs ml-2 font-medium">
                                Free Shipping
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-700 mb-1">
                            {p.name}
                          </p>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                            {p.description}
                          </p>
                          <Link
                            to={`/product/${p.id}`}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            View details
                          </Link>
                        </div>
                        <button className="text-gray-300 hover:text-red-400 text-xl self-start">
                          ♡
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Fallback */}
                {products.length === 0 && (
                  <div className="text-center py-16 bg-white rounded-xl border">
                    <p className="text-gray-400 text-lg mb-3">
                      No products found
                    </p>
                    <button
                      onClick={() => {
                        setSearch("");
                        setActiveCategory("All");
                      }}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {/* Figma Pagination (Static) */}
                {products.length > 0 && (
                  <div className="flex justify-end items-center gap-2 mt-6">
                    <span className="text-sm text-gray-500">Show</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      ‹
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
