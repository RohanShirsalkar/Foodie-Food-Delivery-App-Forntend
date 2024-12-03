import { useContext, useEffect, useState } from "react";
import RestaurantCard from "../components/shared/RestaurantCard";
import { getRestaurantsByCity } from "../api/restaurant.api";

const Home_Page = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRestaurantsByCity("nagpur");
        console.log(response);
        setRestaurants(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching restaurantsByCity");
      }
    };
    fetchData();
  }, []);

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
