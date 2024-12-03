import { useState, createContext, useContext, useEffect } from "react";
import {
  deleteCartItemById,
  createCartItem,
  updateCartItemById,
  deleteAllCartItemsByCartId,
  findCartByUserId,
} from "../api/cart.api";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [restaurantId, setRestaurantId] = useState("");

  const navigate = useNavigate();

  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findCartByUserId(userId);
        setCart(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching cart data.");
      }
    };
    fetchData();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addItemToCart = async (data) => {
    try {
      const response = await createCartItem(data);
      setCart(response.data);
    } catch (error) {
      console.log(error);
      alert("Error adding item to cart");
    }
  };

  const increaseItemQuantity = async (item) => {
    try {
      const response = await updateCartItemById(item.id, {
        quantity: item.quantity + 1,
      });
      setCart(response.data);
    } catch (error) {
      console.log(error);
      alert("Error adding item to cart");
    }
  };

  const decreaseItemQuantity = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await updateCartItemById(item.id, {
          quantity: item.quantity - 1,
        });
        setCart(response.data);
      } catch (error) {
        console.log(error);
        alert("Error adding item to cart");
      }
    } else {
      alert("Cannot decrease quantity more than one.");
    }
  };

  const clearCart = async (id) => {
    try {
      const response = await deleteAllCartItemsByCartId(id);
      setCart(response.data);
    } catch (error) {
      console.log(error);
      alert("Error clearing cart");
    }
  };

  const proceedToCheckout = async (data) => {
    navigate("order-overview/2");
    setIsCartOpen(false);
  };

  const setCart = (cart) => {
    setCartItems(cart.cartItem);
    setCartId(cart.id);
    setTotalPrice(cart.total);
    if (cart?.cartItem[0]?.restaurantId) {
      setRestaurantId(cart.cartItem[0].restaurantId);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const response = await deleteCartItemById(itemId);
      setCartItems(response.data.cartItem);
      console.log("delete res", response.data);
    } catch (error) {
      console.log(error);
      alert("Error while removing item from cart");
    }
  };

  const value = {
    isCartOpen,
    cartItems,
    totalPrice,
    toggleCart,
    addItemToCart,
    clearCart,
    proceedToCheckout,
    cartId,
    setCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    restaurantId,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
