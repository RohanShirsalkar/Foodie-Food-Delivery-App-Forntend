import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let user_id = localStorage.getItem("userId") || null;
    let access_token = localStorage.getItem("accessToken") || null;
    let user_phone = localStorage.getItem("userPhone") || null;
    let user_location = localStorage.getItem("userLocation") || null;

    setUserLocation(user_location);

    if (user_id && access_token && user_phone) {
      setUser({ id: user_id, phone: user_phone }, access_token);
    }
  }, []);

  const setUser = (user, token) => {
    setUserId(user.id);
    localStorage.setItem("userId", user.id);
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    setUserPhone(user.phone);
    localStorage.setItem("userPhone", user.phone);
    setLoggedIn(true);
  };

  const setLocation = (location) => {
    setUserLocation(location);
    console.log(location);
    localStorage.setItem("userLocation", location);
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setUserPhone(null);
    localStorage.removeItem("userPhone");
    setLoggedIn(false);
    navigate("/");
  };

  const values = {
    userId,
    setUserId,
    setUser,
    loggedIn,
    userLocation,
    setLocation,
    setUserLocation,
    userPhone,
    setLoggedIn,
    logout,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
