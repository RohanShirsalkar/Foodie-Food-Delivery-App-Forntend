import { useState } from "react";
import AddressSelector from "../components/order_overvier_page/AddressSelector";

const Order_Overview_Page = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Margherita Pizza", quantity: 2, price: 10.99 },
    { id: 2, name: "Veggie Burger", quantity: 1, price: 8.49 },
    { id: 3, name: "Pasta Alfredo", quantity: 1, price: 12.79 },
  ]);

  const deliveryFee = 4.99;

  const updateQuantity = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    // Redirect to order summary or home
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-6 pt-6">
        <button
          onClick={() => alert("Navigate back to menu")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold">Review Your Order</h1>
        <div></div> {/* Empty div for layout alignment */}
      </div>

      {/* Order Items Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Items</h2>
        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item) => (
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
                      onClick={() => updateQuantity(item.id, "decrease")}
                      className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "increase")}
                      className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
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

      {/*  */}

      <AddressSelector />

      {/* Order Summary Section */}
      <div className="pt-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
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
