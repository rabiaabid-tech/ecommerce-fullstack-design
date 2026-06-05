import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/assets/Layout/Brand/logo-colored.png";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All category");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

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

  

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ROW 1 */}
      <div className="px-6 md:px-10 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 min-w-fit">
          <img src={logo} alt="Brand" className="h-8 w-8" />
          <span className="text-blue-600 font-bold text-xl">Brand</span>
        </Link>

        {/* Search Bar */}
        <div
          className="flex-1 flex items-center border border-gray-300
          rounded-md overflow-hidden max-w-2xl mx-auto"
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
            text-gray-600 bg-gray-50 focus:outline-none hidden md:block"
          >
            <option>All category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Interior</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 text-sm
            font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Right Icons - Desktop */}
        <div
          className="hidden md:flex items-center gap-5
          text-gray-500 text-xs min-w-fit"
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
            className="relative flex flex-col items-center hover:text-blue-600"
          >
            <span className="text-xl mb-0.5">🛒</span>
            <span>My cart</span>
            {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
            {cartCount}
            </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ROW 2 - Category Nav */}
      <div
        className="hidden md:flex items-center justify-between
        border-t border-gray-100 px-10 py-2 text-sm text-gray-600"
      >
        <div className="flex items-center gap-6">
          <button
            className="flex items-center gap-1
            font-medium hover:text-blue-600"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-3
          px-6 py-4 border-t text-gray-600 text-sm"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            My Cart
          </Link>
          <div className="flex border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-3 text-sm"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
