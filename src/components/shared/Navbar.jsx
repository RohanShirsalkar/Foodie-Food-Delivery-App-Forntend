import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const { toggleCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">Foodie</div>

          {/* Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-6">
            <a
              href="/"
              className="text-gray-800 font-medium hover:text-blue-500"
            >
              Home
            </a>
            <a
              className="text-gray-800 font-medium hover:text-blue-500 cursor-pointer"
              onClick={toggleCart}
            >
              Cart
            </a>
            <a
              href="/contact"
              className="text-gray-800 font-medium hover:text-blue-500"
            >
              Sign in
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          {/* Search Bar (Mobile Only) */}
          <div className="px-4 py-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* Links */}
          <a
            href="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500"
          >
            Home
          </a>
          <a
            href="/restaurants"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500"
          >
            Restaurants
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500"
          >
            About
          </a>
          <a
            href="/contact"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-blue-500"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
