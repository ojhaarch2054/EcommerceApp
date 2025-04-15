import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//create the context
export const CartContext = createContext();

//create the provider component
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  //function to add an item to the cart
  const addToCart = async (product) => {
    try {
      //axios to send a post rqst to backend
      const response = await axios.post("http://localhost:3000/add_product", product);
  
      //extract the newly added product from the response
      const newProduct = response.data;
      console.log("Product added to the database:", newProduct);
  
      //update the local cart state
      setCartItem((prevCart) => [...prevCart, newProduct]);
    } catch (error) {
      console.error("Error adding product to cart:", error.response?.data || error.message);
    }
  };

   //fetch added products from the db
   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cartItems");
        //api returns an array of products
        setCartItem(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CartContext.Provider value={{ cartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};