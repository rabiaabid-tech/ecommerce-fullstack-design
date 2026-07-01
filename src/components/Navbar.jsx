import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/assets/Layout/Brand/logo-colored.png";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All category");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  const handleSearch = () => {
    if (search.trim()) navigate(`/products?search=${search}`);
  };

  const categories = [
    "All category",
    "Gadgets",
    "Clothes",
    "Accessories",
    "Electronics",
    "Interior",
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ── ROW 1: Logo + Icons ── */}
      <div className="px-4 md:px-10 py-3 flex items-center gap-3">
        {/* Mobile: Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-600 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Brand" className="h-7 w-7 md:h-8 md:w-8" />
          <span className="text-blue-600 font-bold text-lg md:text-xl">
            TradeGrid
          </span>
        </Link>

        {/* Search Bar — Desktop only */}
        <div
          className="hidden md:flex flex-1 items-center border
          border-gray-300 rounded-md overflow-hidden max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-l border-gray-300 px-2 py-2 text-sm
            text-gray-600 bg-gray-50 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 text-sm
            font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Right Icons — Desktop */}
        <div
          className="hidden md:flex items-center gap-5
          text-gray-500 text-xs shrink-0"
        >
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span className="text-xl mb-0.5">👤</span>
            <span>Profile</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span className="text-xl mb-0.5">💬</span>
            <span>Message</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <span className="text-xl mb-0.5">📋</span>
            <span>Orders</span>
          </Link>
          <Link
            to="/cart"
            className="relative flex flex-col items-center
            hover:text-blue-600"
          >
            <span className="text-xl mb-0.5">🛒</span>
            <span>My cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500
                text-white text-[10px] font-bold h-4 w-4 flex
                items-center justify-center rounded-full"
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: Cart + Profile icons */}
        <div className="md:hidden flex items-center gap-3 ml-auto">
          <Link to="/cart" className="relative text-gray-600">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-red-500
                text-white text-[10px] font-bold h-4 w-4 flex
                items-center justify-center rounded-full"
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/" className="text-gray-600">
            <span className="text-2xl">👤</span>
          </Link>
        </div>
      </div>

      {/* ── ROW 2: Search Bar — Mobile only ── */}
      <div className="md:hidden px-4 pb-2">
        <div
          className="flex items-center border border-gray-300
          rounded-lg overflow-hidden bg-gray-50"
        >
          <span className="pl-3 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-3 py-2 text-sm focus:outline-none
            bg-transparent"
          />
        </div>
      </div>

      {/* ── ROW 3: Category Pills — Mobile only ── */}
      <div
        className="md:hidden px-4 pb-2 overflow-x-auto
        scrollbar-hide"
      >
        <div className="flex gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                navigate(
                  `/products?search=${cat === "All category" ? "" : cat}`,
                );
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium
              whitespace-nowrap border transition
              ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-200 hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── ROW 4: Desktop Category Nav ── */}
      <div
        className="hidden md:flex items-center justify-between
        border-t border-gray-100 px-10 py-2 text-sm text-gray-600"
      >
        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-1 font-medium
            hover:text-blue-600"
          >
            ☰ All category
          </button>
          <Link to="/" className="hover:text-blue-600">
            Hot offers
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Gift boxes
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Projects
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Menu item
          </Link>
          <span className="hover:text-blue-600 cursor-pointer">Help ▾</span>
        </div>
        <div className="flex items-center gap-4 text-gray-400 text-xs">
          <span>English, USD</span>
          <span>🚢 Ship to 🇩🇪</span>
        </div>
      </div>

      {/* ── Mobile Drawer Menu ── */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-3 px-6 py-4
          border-t text-gray-600 text-sm bg-white shadow-lg"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-blue-600"
          >
            🏠 Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-blue-600"
          >
            📦 Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-blue-600"
          >
            🛒 My Cart
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-blue-600"
          >
            👤 Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="py-1 hover:text-blue-600"
          >
            📝 Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
