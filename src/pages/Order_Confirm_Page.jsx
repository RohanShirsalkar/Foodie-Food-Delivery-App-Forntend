import { useState } from "react";

const Order_Confirm_Page = () => {
  const orderDetails = {
    orderId: "12345ABC",
    restaurant: {
      name: "The Gourmet Kitchen",
      image: "https://via.placeholder.com/800x300?text=Restaurant+Image",
    },
    deliveryDetails: {
      address: "123 Main Street, Downtown City",
      estimatedTime: "30-40 minutes",
    },
    items: [
      { id: 1, name: "Margherita Pizza", quantity: 2, price: 10.99 },
      { id: 2, name: "Veggie Burger", quantity: 1, price: 8.49 },
      { id: 3, name: "Pasta Alfredo", quantity: 1, price: 12.79 },
    ],
    deliveryFee: 4.99,
  };

  const subtotal = orderDetails.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + orderDetails.deliveryFee;

  return (
    <div className="min-h-screen py-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={orderDetails.restaurant.image}
            alt={orderDetails.restaurant.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Order Confirmed!✅</h1>
            <p className="text-gray-600">Order ID: {orderDetails.orderId}</p>
            <p className="text-gray-800 mt-1">{orderDetails.restaurant.name}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <ul className="space-y-4">
          {orderDetails.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${orderDetails.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {orderDetails.deliveryDetails.address}
        </p>
        <p>
          <span className="font-semibold">Estimated Time:</span>{" "}
          {orderDetails.deliveryDetails.estimatedTime}
        </p>
      </div>

      {/* Call-to-Action */}
      <div className="">
        <button
          onClick={() => alert("Returning to home page...")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Order_Confirm_Page;
