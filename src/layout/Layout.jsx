import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { CartContextProvider } from "../context/CartContext";
import Cart_Container from "../components/cart/Cart_Container";

const Layout = () => {
  return (
    <div>
      <CartContextProvider>
        <Navbar />
        <Cart_Container />
        {/* <Cart_Sidebar
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClearCart={clearCart}
          onCheckout={proceedToCheckout}
        /> */}
        <div className="md:max-w-7xl max-w-full px-4 md:px-6 mx-auto">
          <Outlet />
        </div>
      </CartContextProvider>
    </div>
  );
};

export default Layout;
