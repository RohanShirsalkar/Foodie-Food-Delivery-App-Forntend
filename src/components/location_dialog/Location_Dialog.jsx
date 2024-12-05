import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Location_Dialog = ({ isOpen, onClose, onSelectLocation }) => {
  const { userLocation, setUserLocation } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const locations = ["Nagpur", "Bangalore", "Chennai ", "Delhi"];

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (location) => {
    setUserLocation(location);
    onSelectLocation(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select Location</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location List */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {filteredLocations.map((location) => (
            <div
              key={location}
              className={`p-3 rounded-lg cursor-pointer ${
                userLocation === location
                  ? "bg-blue-100 border border-blue-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSelect(location)}
            >
              {location}
            </div>
          ))}
          {filteredLocations.length === 0 && (
            <p className="text-gray-600 text-sm">No locations found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Location_Dialog;
