import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findOrderById } from "../api/order.api";
import { useNavigate } from "react-router-dom";

const Order_Confirm_Page = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resposne = await findOrderById(orderId);
        console.log(resposne);
        setOrderDetail(resposne.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching order details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  if (isLoading) {
    return <h1> Loading... 🌐 </h1>;
  }
  return (
    <div className="min-h-screen py-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={orderDetails.image}
            alt={orderDetails.restaurant.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Order Confirmed!✅</h1>
            <p className="text-gray-600">Order ID: {orderDetails?.id}</p>
            <p className="text-gray-800 mt-1">
              {orderDetails?.restaurant.name}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <ul className="space-y-4">
          {orderDetails.orderItem.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{item?.id}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${orderDetails.cartTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${orderDetails.deliveryCharges}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${orderDetails.total}</span>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {`${orderDetails.address.street}, ${orderDetails.address.city}, ${orderDetails.address.pinCode}`}
        </p>
        <p>
          <span className="font-semibold">Estimated Time:</span>{" "}
          {"30-40 minutes"}
        </p>
      </div>

      {/* Call-to-Action */}
      <div className="">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Order_Confirm_Page;
