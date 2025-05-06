import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
//create the context
export const CartContext = createContext();
//create the provider component
export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  //get user and loading from authcontext
  const { user, loading } = useContext(AuthContext);
  //extract from the user obj
  const userId = user?.id;

  //function to add an item to the cart
  const addToCart = async (product) => {
    try {
      //if user id is missing
      if (!userId) {
        console.error("User ID is missing. Cannot add product to cart.");
        //add product to the local cart state for non authenticated user
        setCartItem((prevCart) => [...prevCart, product]);
        return;
      }
      //add user id to the product obj
      const productWithUserId = {
        ...product,
        //user id from state
        user_id: userId,
      };
      console.log("Product sent to server:", productWithUserId);
      //axios to send a post rqst to backend
      const response = await axios.post(
        "http://localhost:3000/add_product",
        productWithUserId
      );
      //extract the newly added product from the response
      const newProduct = response.data;
      console.log("Product added to the database:", newProduct);
      //update the local cart state
      setCartItem((prevCart) => [...prevCart, newProduct]);
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error.message
      );
    }
  };

  //function to fetch cart items for a specific user
  useEffect(() => {
    if (loading) return;
    /* if (!userId) {
      console.error("User ID is missing. Cannot fetch cart items.");
      return;
    }*/
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cartItems/${userId}`
        );
        //set fetched cart item
        setCartItem(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    //only fetch products if userId is set
    if (userId) {
      fetchProducts();
    }
    //refetch cart items when user or loading state change
  }, [user, loading]);

  //remove cart item
  const removeFromCart = (product_id) => {
    setCartItem((prevCart) =>
      prevCart.filter((item) => item.product_id !== product_id)
    );
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
