import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const openAddressDialog = () => {
    setIsAddressDialogOpen(true);
  };
  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
  };

  const values = {
    isAddressDialogOpen,
    setIsAddressDialogOpen,
    openAddressDialog,
    closeAddressDialog,
    setAddresses,
    addresses,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
