import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
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
  const openLocationDialog = () => {
    setIsLocationDialogOpen(true);
  };
  const closeLocationDialog = () => {
    setIsLocationDialogOpen(false);
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
    isLocationDialogOpen,
    openLocationDialog,
    closeLocationDialog,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
