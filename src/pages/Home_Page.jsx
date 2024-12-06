import { useContext, useEffect, useState } from "react";
import RestaurantCard from "../components/shared/RestaurantCard";
import { getRestaurantsByCity } from "../api/restaurant.api";
import { UserContext } from "../context/UserContext";
import { FiMapPin } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const Home_Page = () => {
  const { userLocation } = useContext(UserContext);
  const { openLocationDialog } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRestaurantsByCity(userLocation);
        console.log(response);
        setRestaurants(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching restaurantsByCity");
      }
    };
    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  // if (!userLocation) {
  //   return (
  //     <p className="text-center text-2xl mt-10 ">
  //       Please select a city to continue. <br /> 🌎 🏠 ✍️
  //     </p>
  //   );
  // }

  // if (restaurants.length < 1) {
  //   return (
  //     <p className="text-center text-2xl mt-10 ">
  //       {" "}
  //       🍲 ✨ 🎉 We found {restaurants.length} restaurants in your city
  //     </p>
  //   );
  // }

  return (
    <div className="py-6">
      <div className="p-4 mb-4 bg-white border rounded-lg shadow-md flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <FiMapPin size={20} />
            <p className="font-semibold">{userLocation || "Not selected"}</p>
          </div>
        </div>
        <button
          onClick={openLocationDialog}
          className="px-4 py-2 w-full md:w-auto text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          {userLocation ? "Change location" : "Select Location"}
        </button>
      </div>
      {!userLocation && (
        <p className="text-center text-2xl mt-10  ">
          {" "}
          🌎 🏠 Select a city to continue.
        </p>
      )}
      {userLocation && restaurants?.length < 1 && (
        <p className="text-center text-2xl mt-10  ">
          {" "}
          We found {restaurants.length} restaurants in your city
        </p>
      )}
      {userLocation && restaurants.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {restaurants?.map((item) => (
            <RestaurantCard key={item.id} restaurant={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home_Page;
