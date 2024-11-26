import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("d2cdb91b-1e86-4905-93c3-09dd1c6b5f44");
  const values = { userId, setUserId };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
