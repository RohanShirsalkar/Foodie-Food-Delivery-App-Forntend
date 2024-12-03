import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("4d76eb7c-a4d0-47a8-baf8-1cbe00854fe3");
  const values = { userId, setUserId };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
