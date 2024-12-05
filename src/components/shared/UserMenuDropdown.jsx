import { useState, useRef, useEffect, useContext } from "react";
import { FiUser } from "react-icons/fi";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserMenuDropdown = () => {
  const { logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onLogout = () => {
    logout();
    setIsOpen(false);
  };

  const onOrders = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  const onSettings = () => {};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={handleToggle}
        className="rounded-full mt-2 text-gray hover:text-blue-600 focus:outline-none"
      >
        <FiUser size={20} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <li
            onClick={onOrders}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            Orders
          </li>
          <li
            onClick={onSettings}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            Settings
          </li>
          <li
            onClick={onLogout}
            className="px-4 py-2 cursor-pointer text-red-500 hover:bg-gray-100"
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenuDropdown;
