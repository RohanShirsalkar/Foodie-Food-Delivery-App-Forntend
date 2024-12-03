import React, { useState } from "react";
import { FaCreditCard, FaMoneyCheckAlt, FaMoneyBill } from "react-icons/fa";

const PaymentSelector = ({
  onPaymentSelect,
  selectedMethod,
  setSelectedMethod,
}) => {
  const paymentMethods = [
    { id: "CASH", name: "Cash On Delivery", icon: <FaMoneyBill /> },
    { id: "RAZORPAY", name: "Razorpay", icon: <FaMoneyCheckAlt /> },
  ];

  const handleSelect = (id) => {
    setSelectedMethod(id);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Select Payment Method</h1>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center p-4 rounded-lg border ${
              selectedMethod === method.id
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300"
            } cursor-pointer hover:shadow-md`}
            onClick={() => handleSelect(method.id)}
          >
            <div className="text-3xl text-blue-500">{method.icon}</div>
            <div className="ml-4">
              <h3 className="font-semibold">{method.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSelector;
