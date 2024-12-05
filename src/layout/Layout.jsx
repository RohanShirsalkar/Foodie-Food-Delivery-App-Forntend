import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { CartContextProvider } from "../context/CartContext";
import { UserContextProvider } from "../context/UserContext";
import Cart_Container from "../components/cart/Cart_Container";
import Address_Container from "../components/address_dialog/Address_Container";
import { AppContextProvider } from "../context/AppContext";
import Auth_Container from "../components/auth_dialog/Auth_Container";
import Location_Container from "../components/location_dialog/Location_Container";

const Layout = () => {
  return (
    <div>
      <AppContextProvider>
        <UserContextProvider>
          <CartContextProvider>
            <Navbar />
            <Cart_Container />
            <Address_Container />
            <Auth_Container />
            <Location_Container />
            <div className="md:max-w-7xl max-w-full px-4 md:px-6 mx-auto">
              <Outlet />
            </div>
          </CartContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </div>
  );
};

export default Layout;
