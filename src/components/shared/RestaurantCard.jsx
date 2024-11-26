import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({
  restaurant = {
    id: "be93ebfb-b1ef-4e4f-95c1-54d1b35cce90",
    name: "Pizza Palace",
    rating: 4.5,
    cuisine: "Italian",
    costForTwo: 500,
    deliveryTime: 30,
    image: "https://via.placeholder.com/300x200",
  },
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`restaurant/${restaurant.id}`)}
      className="bg-white border rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
    >
      {/* Restaurant Image */}
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={restaurant.image}
        alt={restaurant.name}
      />

      {/* Restaurant Details */}
      <div className="p-4">
        {/* Name and Rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
          <div className="flex items-center space-x-1 text-sm text-yellow-500">
            <span>⭐ {restaurant.rating}</span>
          </div>
        </div>

        {/* Cuisine and Cost */}
        <p className="text-sm text-gray-600 mb-2">
          {restaurant.cuisine} • ₹{restaurant.costForTwo} for two
        </p>

        {/* Delivery Time */}
        <p className="text-sm text-gray-500">
          ⏱️ {restaurant.deliveryTime} mins
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
