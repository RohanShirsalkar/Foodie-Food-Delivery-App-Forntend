import { useState, useContext, useEffect } from "react";
import AddressSelector from "../components/order_overvier_page/AddressSelector";
import { CartContext } from "../context/CartContext";
import { getAddressesByUserId } from "../api/address.api";
import { UserContext } from "../context/UserContext";
import { createOrder } from "../api/order.api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import PaymentSelector from "../components/order_overvier_page/PaymentSelector";
import CouponSelector from "../components/order_overvier_page/CouponSelector";

const Order_Overview_Page = () => {
  const { userId, userLocation } = useContext(UserContext);
  const {
    cartItems,
    totalPrice,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    restaurantId,
    restaurantlocation,
    setCart,
  } = useContext(CartContext);
  const { addresses, setAddresses } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const deliveryFee = 50;
  const navigate = useNavigate();

  useEffect(() => {
    if (!totalPrice) {
      return;
    }
    if (selectedCoupon) {
      if (selectedCoupon?.discountType === "AMOUNT") {
        setCouponDiscount(selectedCoupon.discount);
        setGrandTotal(totalPrice - selectedCoupon.discount + deliveryFee);
      } else {
        let couponDiscount = totalPrice * (selectedCoupon?.discount / 100);
        setCouponDiscount(couponDiscount);
        setGrandTotal(totalPrice - couponDiscount + deliveryFee);
      }
    } else {
      setGrandTotal(totalPrice + deliveryFee);
    }
  }, [selectedCoupon, totalPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAddressesByUserId(userId);
        setAddresses(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching addresses");
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handlePlaceOrder = async () => {
    if (!selectedMethod) {
      alert("Please select a delivery method");
      return;
    }
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }
    if (restaurantlocation !== userLocation) {
      alert("Restaurant is not available in your current location");
      return;
    }
    if (userLocation !== selectedAddress?.city) {
      alert("Please select an address in your current location");
      return;
    }
    try {
      const response = await createOrder({
        userId,
        restaurantId,
        paymentMethod: selectedMethod,
        deliveryCharges: deliveryFee,
        addressId: selectedAddress?.id,
        couponId: selectedCoupon?.id || null,
      });
      alert("Order placed successfully");
      setCart(response.data.updatedCart);
      navigate(`/order-confirm/${response.data.updatedOrder.id}`);
    } catch (error) {
      console.log(error);
      alert("Error placing order");
    }
  };
  const handleCouponSelect = (coupon) => {
    alert(`${coupon.code} Coupon Applied`);
    // Logic to apply the selected coupon
  };

  const handlePaymentSelect = (method) => {
    alert(`Payment method selected: ${method}`);
    // Proceed to payment logic here
  };

  return (
    <div className="min-h-screen pb-6">
      <div className="flex items-center space-x-4 mb-6 pt-6">
        <button
          onClick={() => alert("Navigate back to menu")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold">Review Your Order</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Items</h2>
        {cartItems?.length > 0 ? (
          <ul className="space-y-4">
            {cartItems?.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      onClick={() => decreaseItemQuantity(item)}
                      className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseItemQuantity(item)}
                      className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <AddressSelector
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />

      <CouponSelector
        onCouponSelect={handleCouponSelect}
        selectedCoupon={selectedCoupon}
        setSelectedCoupon={setSelectedCoupon}
      />

      <PaymentSelector
        onPaymentSelect={handlePaymentSelect}
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />

      <div className="pt-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            {selectedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>${couponDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-x-2">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Place Order
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
        >
          Cancle Order
        </button>
      </div>
    </div>
  );
};

export default Order_Overview_Page;
