import { useContext, useState } from "react";
import Address_Dialog from "./Address_Dialog";
import { AppContext } from "../../context/AppContext";

const Address_Container = () => {
  const { isAddressDialogOpen, closeAddressDialog, setAddresses } =
    useContext(AppContext);
  return (
    <div>
      <Address_Dialog
        isOpen={isAddressDialogOpen}
        onClose={closeAddressDialog}
        // onSave={handleAddAddress}
      />
    </div>
  );
};

export default Address_Container;
