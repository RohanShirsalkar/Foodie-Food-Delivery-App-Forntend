import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { createAddress } from "../../api/address.api";
import { UserContext } from "../../context/UserContext";

const Address_Dialog = ({ isOpen, onClose }) => {
  const { userId } = useContext(UserContext);
  const { setAddresses } = useContext(AppContext);
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    pinCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.city || !formData.street || !formData.pinCode) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const response = await createAddress({ ...formData, userId });
      alert("Address created successfully.");
      setAddresses(response.data);
      setFormData({ city: "", street: "", pinCode: "" });
    } catch (error) {
      console.log(error);
      alert("Error occurred while creating address.");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your street"
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your pincode"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address_Dialog;
