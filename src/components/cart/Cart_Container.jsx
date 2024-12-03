import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Cart_Sidebar from "./Cart_Sidebar";

const Cart_Container = () => {
  const { isCartOpen, cartItems, setCart } = useContext(CartContext);

  return <div className="h-full">{isCartOpen && <Cart_Sidebar />}</div>;
};

export default Cart_Container;
