import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const setUser = (user, token) => {
    setUserId(user.id);
    setAccessToken(token);
    setUserPhone(user.phone);
    setLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setAccessToken(null);
    setUserPhone(null);
    setLoggedIn(false);
  };

  const values = {
    userId,
    setUserId,
    setUser,
    loggedIn,
    userLocation,
    userPhone,
    setLoggedIn,
    logout,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
