import { useContext, useEffect, useState } from "react";
import RestaurantCard from "../components/shared/RestaurantCard";
import { getRestaurantsByCity } from "../api/restaurant.api";
import { UserContext } from "../context/UserContext";

const Home_Page = () => {
  const { userLocation } = useContext(UserContext);
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

  if (!userLocation) {
    return (
      <p className="text-center text-2xl mt-10 ">
        Please select a city to continue. <br /> 🌎 🏠 ✍️
      </p>
    );
  }

  if (restaurants.length < 1) {
    return (
      <p className="text-center text-2xl mt-10 ">
        {" "}
        🍲 ✨ 🎉 We found {restaurants.length} restaurants in your city
      </p>
    );
  }

  return (
    <div className="py-6">
      <div className="grid md:grid-cols-3 gap-4">
        {restaurants?.map((item) => (
          <RestaurantCard key={item.id} restaurant={item} />
        ))}
      </div>
    </div>
  );
};

export default Home_Page;
