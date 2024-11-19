import React from "react";

const MenuItem = ({ item, onAddToCart }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white border-b p-4 hover:bg-gray-50 transition duration-200">
      {/* Item Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full md:w-20 h-32 md:h-20 rounded-lg object-cover mb-4 md:mb-0 md:mr-4"
      />

      {/* Item Info */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-800 font-semibold mt-1">
          ₹{item.price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4 md:mt-0">
        <button
          onClick={() => onAddToCart(item)}
          className="px-4 py-2 w-full md:w-auto text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
