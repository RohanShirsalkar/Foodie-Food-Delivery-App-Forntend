import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { findOrderByUserId } from "../api/order.api";

const Order_History = () => {
  const { userId, loggedIn } = useContext(UserContext);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findOrderByUserId(userId);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching order history");
      }
    };
    if (loggedIn) {
      fetchData();
    }
  }, [userId]);

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${String(date.getFullYear()).slice(2)}`;
    return formattedDate;
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  if (!loggedIn) {
    return <>Login to view order history...</>;
  }
  return (
    <div className="py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            {/* Order Summary */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-gray-600">
                  Date: {convertDate(order.createdAt)}
                </p>
                <p className="text-gray-600">
                  Total: ₹{order.total.toFixed(2)}
                </p>
                <p
                  className={`font-medium ${
                    order.status === "COMPLETED"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>
              <button className="text-blue-500 hover:underline">
                {expandedOrderId === order.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {/* Order Details */}
            {expandedOrderId === order.id && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {order.orderItem.map((item) => (
                    <li key={item.id}>
                      {item.quantity} x {item.id}
                    </li>
                  ))}
                </ul>
                <h3 className="font-semibold mt-4">Delivery Address:</h3>
                <p className="text-gray-700">{`${order.address.street}, ${order.address.city}, ${order.address.pinCode}`}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order_History;
