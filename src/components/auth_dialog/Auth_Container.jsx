import { useContext, useState } from "react";
import Auth_Dialog from "./Auth_Dialog";
import { AppContext } from "../../context/AppContext";

const Auth_Container = () => {
  const { isAuthDialogOpen, closeAuthDialog } = useContext(AppContext);

  return (
    <div>
      <Auth_Dialog isOpen={isAuthDialogOpen} onClose={closeAuthDialog} />
    </div>
  );
};

export default Auth_Container;
