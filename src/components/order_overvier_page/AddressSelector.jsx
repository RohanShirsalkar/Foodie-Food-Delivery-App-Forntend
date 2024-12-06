import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AddressSelector = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  const { openAddressDialog } = useContext(AppContext);
  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Select Delivery Address</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
        {addresses.length > 0 ? (
          <ul className="space-y-4">
            {addresses?.map((address) => (
              <li
                key={address.id}
                onClick={() => setSelectedAddress(address)}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedAddress?.id === address?.id
                    ? "bg-blue-100 border border-blue-500"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <h3 className="font-semibold">{address.city}</h3>
                <p className="text-sm text-gray-600">{`${address.street}, ${address.city}, ${address.pinCode}`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have no saved addresses.</p>
        )}
      </div>

      <div className="">
        <button
          onClick={openAddressDialog}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressSelector;
