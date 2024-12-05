import React, { useCallback, useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getRestaurantByItem,
  getResultBySearchedQuery,
} from "../../api/restaurant.api";
import SearchBarCombobox from "../SearchBarCombobox/SearchBarCombobox";
import UserMenuDropdown from "./UserMenuDropdown";

const Navbar = () => {
  const { openAuthDialog, openLocationDialog } = useContext(AppContext);
  const { userLocation, userPhone, loggedIn, logout } = useContext(UserContext);
  const { toggleCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isComboBoxOpen, setIsComboBoxOpen] = useState(false);

  const navigate = useNavigate();

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion.type === "restaurant") {
      navigate(`/restaurant/${suggestion.id}`);
    } else {
      navigate(
        `/restaurant/${suggestion.restaurantId}/queryItem/${suggestion.id}`
      );
    }
  };

  function debounce(func, delay = 1000) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debounseResult = useCallback(
    debounce(async (arg) => {
      try {
        const resposne = await getResultBySearchedQuery(arg);
        console.log(resposne.data.menuItems);
        const updatedRestaurants = resposne.data.restaurants.map(
          (restaurant) => {
            return {
              ...restaurant,
              type: "restaurant",
            };
          }
        );
        const updatedMenuItems = resposne.data.menuItems.map((menuItem) => {
          return {
            ...menuItem,
            type: "menuItem",
          };
        });
        setSearchResults([...updatedRestaurants, ...updatedMenuItems]);
      } catch (error) {
        console.log(error);
        alert("Error in fetching data");
      }
    }, 1000),
    []
  );

  const handleSearch = (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value) {
      setIsComboBoxOpen(true);
      debounseResult(value);
    } else {
      setSearchResults([]);
      setIsComboBoxOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={"/"} className="text-2xl font-bold text-gray-800">
            Foodie
          </Link>

          {/* Search Bar ComboBox */}
          <div className=" hidden md:flex flex-1 mx-8">
            <SearchBarCombobox
              isOpen={isComboBoxOpen}
              setIsOpen={setIsComboBoxOpen}
              query={query}
              setQuery={setQuery}
              suggestions={searchResults}
              onSelect={handleSelectSuggestion}
              handleInputChange={handleSearch}
            />
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              onClick={openLocationDialog}
              className="text-gray-800 font-medium hover:text-blue-500 cursor-pointer"
            >
              {userLocation ? `📍${userLocation}` : "📍Select Location"}
            </a>
            <a
              className="text-gray-800 font-medium hover:text-blue-500 cursor-pointer"
              onClick={toggleCart}
            >
              Cart
            </a>

            {loggedIn ? (
              <>
                <UserMenuDropdown />
              </>
            ) : (
              <a
                onClick={openAuthDialog}
                className="text-gray-800 font-medium hover:text-blue-500 cursor-pointer"
              >
                Sign in
              </a>
            )}
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
              onChange={handleSearch}
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
