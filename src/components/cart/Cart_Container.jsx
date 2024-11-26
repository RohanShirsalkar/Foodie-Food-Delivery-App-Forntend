import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Cart_Sidebar from "./Cart_Sidebar";
import { findCartByUserId } from "../../api/cart.api";
import { UserContext } from "../../context/UserContext";

const Cart_Container = () => {
  const { isCartOpen, cartItems, setCart } = useContext(CartContext);
  // const userId = useContext(UserContext);
  // console.log(isCartOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findCartByUserId(
          "d2cdb91b-1e86-4905-93c3-09dd1c6b5f44"
        );
        setCart(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching cart data.");
      }
    };
    fetchData();
  }, []);

  return <div className="h-full">{isCartOpen && <Cart_Sidebar />}</div>;
};

export default Cart_Container;
