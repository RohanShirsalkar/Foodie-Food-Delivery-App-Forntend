import React, { useContext } from "react";
import RestaurantCard from "../components/shared/RestaurantCard";

const Home_Page = () => {
  return (
    <div className="py-6">
      <div className="grid md:grid-cols-3 gap-4">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </div>
  );
};

export default Home_Page;
