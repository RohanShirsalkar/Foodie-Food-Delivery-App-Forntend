import { useState } from "react";

const AddressSelector = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      details: "123 Main Street, Downtown City",
    },
    {
      id: 2,
      label: "Office",
      details: "456 Business Ave, Tech Park",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleAddNewAddress = () => {
    alert("Open form/modal to add new address.");
    // Logic to open a modal or navigate to a form page
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Select Delivery Address</h1>
      </div>

      {/* Address List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        {addresses.length > 0 ? (
          <ul className="space-y-4">
            {addresses.map((address) => (
              <li
                key={address.id}
                onClick={() => handleSelectAddress(address.id)}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedAddressId === address.id
                    ? "bg-blue-100 border border-blue-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <h3 className="font-semibold">{address.label}</h3>
                <p className="text-sm text-gray-600">{address.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no saved addresses.</p>
        )}
      </div>

      {/* Add New Address Button */}
      <div className="">
        <button
          onClick={handleAddNewAddress}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressSelector;
