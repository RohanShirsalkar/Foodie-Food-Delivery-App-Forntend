import React, { useContext, useEffect, useState } from "react";
import MenuItem from "../components/restaurant_page/MenuItem";
import { getRestaurantById } from "../api/restaurant.api";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Restaurant_Page = () => {
  const { addItemToCart, cartId } = useContext(CartContext);
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRestaurantById(id);
        setRestaurant(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching restaurantById");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-6">
      {/* Hero Section */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="h-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            {restaurant.name}
          </h1>
        </div>
      </div>

      <div className=" mx-auto  py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {restaurant.name}
            </h2>
            <p className="text-gray-600">{restaurant.cuisine}</p>
            <p className="text-sm text-gray-500">{restaurant.location}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-800">
              ⭐ <span className="font-medium">{restaurant.rating}</span>
            </p>
            <p className="text-sm text-gray-500">
              ⏱️ {restaurant.deliveryTime} mins
            </p>
            <p className="text-sm text-gray-500">
              ₹{restaurant.costForTwo} for two
            </p>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Menu</h3>
          <div className="divide-y divide-gray-200 space-y-2">
            {restaurant?.menu?.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onAddToCart={() =>
                  addItemToCart({
                    cartId: cartId,
                    menuItemId: item.id,
                    restaurantId: id,
                    quantity: 1,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant_Page;
