import React from "react";

const Cart_Sidebar = ({
  cartItems,
  totalPrice,
  onClearCart,
  onCheckout,
  toggleCart,
}) => {
  return (
    <div className="fixed right-0 top-0 w-[35%] h-full bg-white shadow-md p-4 z-50">
      {/* <h2 className="text-2xl font-bold mb-4">Your Cart</h2> */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                {/* Item Details */}
                <div className="flex items-center space-x-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>

                {/* Item Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-gray-800">{item.quantity}</span>
                  <button
                    // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    // onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-800">Total</span>
              <span className="font-semibold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full mb-2"
            >
              Checkout
            </button>
            <button
              onClick={onClearCart}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 w-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart_Sidebar;
