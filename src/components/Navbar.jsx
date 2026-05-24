//Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/assets/Layout/Brand/logo-colored.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm px-6 md:px-16 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Shopcart" className="h-10" />
        </Link>

        {/* Links - Desktop */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-700">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-700">
            Products
          </Link>
          <Link to="/cart" className="hover:text-blue-700">
            Cart
          </Link>
        </div>

        {/* Search + Cart - Desktop */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="hidden md:block border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:border-blue-500"
          />
          <Link to="/cart" className="text-2xl">
            🛒
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-4 pb-4 text-gray-600 font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-700"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-700"
          >
            Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-700"
          >
            Cart
          </Link>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
    </nav>
  );
}