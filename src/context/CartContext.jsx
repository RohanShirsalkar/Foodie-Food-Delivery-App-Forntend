import { useState, createContext } from "react";
import {
  deleteCartItemById,
  createCartItem,
  updateCartItemById,
  deleteAllCartItemsByCartId,
} from "../api/cart.api";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

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

  const proceedToCheckout = () => {
    alert("Proceeding to checkout...");
    clearCart();
  };

  const setCart = (cart) => {
    setCartItems(cart.cartItem);
    setCartId(cart.id);
    setTotalPrice(cart.total);
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
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
