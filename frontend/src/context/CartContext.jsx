import React, { createContext, useState } from "react";

//create the context
export const CartContext = createContext();

//create the provider component
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  //function to add an item to the cart
  const addToCart = (product) => {
    setCartItem((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};