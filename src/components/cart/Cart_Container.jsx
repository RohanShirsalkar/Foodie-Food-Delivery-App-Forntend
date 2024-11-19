import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Cart_Sidebar from "./Cart_Sidebar";

const Cart_Container = () => {
  const {
    isCartOpen,
    cartItems,
    totalPrice,
    toggleCart,
    addItemToCart,
    clearCart,
    proceedToCheckout,
  } = useContext(CartContext);
  return (
    <div className="h-full">
      {isCartOpen && (
        <Cart_Sidebar
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClearCart={clearCart}
          onCheckout={proceedToCheckout}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
};

export default Cart_Container;
