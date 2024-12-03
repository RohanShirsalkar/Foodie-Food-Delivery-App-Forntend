import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import {
  getCouponsByRestaurantId,
  getCouponByCode,
} from "../../api/coupon.api";

const CouponSelector = ({
  onCouponSelect,
  selectedCoupon,
  setSelectedCoupon,
}) => {
  const [searchCode, setSearchCode] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const { restaurantId } = useContext(CartContext);

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const response = await getCouponsByRestaurantId(restaurantId);
        setFilteredCoupons(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching coupons");
      }
    };
    if (restaurantId) {
      getCoupons();
    }
  }, [restaurantId]);

  //   const handleSearch = () => {
  //     if (searchCode.trim() === "") {
  //       setFilteredCoupons(coupons);
  //       return;
  //     }
  //     const results = coupons.filter((coupon) =>
  //       coupon.code.toLowerCase().includes(searchCode.toLowerCase())
  //     );
  //     setFilteredCoupons(results);
  //   };

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    onCouponSelect(coupon);
  };

  return (
    <div className="bg-white p-6 shadow-md my-6 rounded-md">
      <h1 className="text-2xl font-bold mb-6">Select a Coupon</h1>

      {/* Search Input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          //   onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Coupon List */}
      <div className="space-y-4">
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className={`p-4 rounded-lg border ${
                selectedCoupon?.id === coupon.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              } cursor-pointer hover:shadow-md`}
              onClick={() => handleSelectCoupon(coupon)}
            >
              <h3 className="font-semibold">{coupon.code}</h3>
              <p className="text-gray-600 text-sm">{coupon.description}</p>
              <p className="text-sm font-bold text-green-600">
                {coupon.discount}
                {coupon.discountType === "AMOUNT" ? "$" : "%"} Off
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No coupons found.</p>
        )}
      </div>
    </div>
  );
};

export default CouponSelector;
