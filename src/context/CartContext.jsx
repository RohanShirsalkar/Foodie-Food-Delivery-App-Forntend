import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      image: "https://via.placeholder.com/150?text=Pizza",
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Veggie Burger",
      image: "https://via.placeholder.com/150?text=Burger",
      price: 8.49,
      quantity: 1,
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      image: "https://via.placeholder.com/150?text=Pasta",
      price: 12.79,
      quantity: 1,
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      image: "https://via.placeholder.com/150?text=Pasta",
      price: 12.79,
      quantity: 1,
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      image: "https://via.placeholder.com/150?text=Pasta",
      price: 12.79,
      quantity: 1,
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Sample function to add items to the cart
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotalPrice(totalPrice + item.price);
  };

  // Sample function to clear cart
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  const proceedToCheckout = () => {
    alert("Proceeding to checkout...");
    clearCart(); // Clear cart after checkout
  };

  const value = {
    isCartOpen,
    cartItems,
    totalPrice,
    toggleCart,
    addItemToCart,
    clearCart,
    proceedToCheckout,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
