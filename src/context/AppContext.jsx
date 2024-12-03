import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const openAddressDialog = () => {
    setIsAddressDialogOpen(true);
  };
  const closeAddressDialog = () => {
    setIsAddressDialogOpen(false);
  };
  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };
  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  const values = {
    isAddressDialogOpen,
    setIsAddressDialogOpen,
    openAddressDialog,
    closeAddressDialog,
    setAddresses,
    addresses,
    isAuthDialogOpen,
    openAuthDialog,
    closeAuthDialog,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
