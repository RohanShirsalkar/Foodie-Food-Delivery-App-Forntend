import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { registerUser, loginUser } from "../../api/user.api";

const Auth_Dialog = ({ isOpen, onClose }) => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { phone, email, password } = formData;

    if (!phone || !password || (!isLogin && !email)) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isLogin) {
      // Add login logic here
      try {
        const response = await loginUser({ phone, password });
        console.log(response);
        setUser(response.data.user, response.data.token);
        onClose();
        // setFormData({ phone: "", email: "", password: "" });
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await registerUser({ phone, email, password });
        setUser(response.user, response.token);
        console.log(response);
        alert("User registered successfully.");
        onClose();
        // setFormData({ phone: "", email: "", password: "" });
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              isLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              !isLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your phone number"
            />
          </div>
          {!isLogin && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => {
              onClose();
              //   setFormData({ phone: "", email: "", password: "" });
            }}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth_Dialog;
