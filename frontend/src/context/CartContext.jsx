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
  //store quantity of the product
  const [quantities, setQuantities] = useState({});

  //extract from the user obj
  const userId = user?.id;

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

  //to update the quantity in the backend
  const updateQuantity = async (product_id, newQuantity) => {
    try {
      console.log(
        "updating quantity for product_id:",
        product_id,
        "with quantity:",
        newQuantity
      );
      const response = await axios.put(
        `http://localhost:3000/products/${product_id}/quantity`,
        {
          product_id: product_id,
          //send quantity in the rqst body
          quantity: newQuantity,
        }
      );
      console.log("Quantity updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  //to increase the quantity
  const increaseQnt = (product_id) => {
    //increase the quantity
    const newQuantity = (quantities[product_id] || 1) + 1;
    //update state
    setQuantities({ ...quantities, [product_id]: newQuantity });
    //update backend
    updateQuantity(product_id, newQuantity);
  };

  //to decrease the quantity
  const decreaseQnt = (product_id) => {
    //decrease quantity
    const newQuantity = Math.max((quantities[product_id] || 1) - 1, 1);
    //update state
    setQuantities({ ...quantities, [product_id]: newQuantity });
    //update backend
    updateQuantity(product_id, newQuantity);
  };

  //to handle manual quantity changes in the input field
  const handleQuantityChange = (e, product_id) => {
    const newQuantity = Number(e.target.value);
    //update the state
    setQuantities({ ...quantities, [product_id]: newQuantity });
    //update backend
    updateQuantity(product_id, newQuantity);
  };

  //to delete cart items
  const deleteItems = async (product_id) => {
    alert("Are you sure to delete this item?");
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${product_id}`,
        {
          //data sent to the backend to identify user id and product id
          data: { user_id: user?.id, product_id },
        }
      );
      //check response
      if (response.status === 200) {
        //console.log(response.data.message);
        removeFromCart(product_id);
      }
    } catch (err) {
      if (err.response) {
        //console.error("Error:", err.response.data.error);
        alert(err.response.data.error);
      } else {
        //console.error("Error deleting product:", err);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  //remove cart item
  const removeFromCart = (product_id) => {
    setCartItem((prevCart) =>
      prevCart.filter((item) => item.product_id !== product_id)
    );
  };

  //sort by lowest price
  const filterLowestPrice = () => {
    //created copy of cart item and sort copied array
    const sortedItems = [...cartItem].sort((a, b) => a.price - b.price);
    //update state
    setCartItem(sortedItems);
  };

  //sort by highest price
  const filterHighestPrice = () => {
    const sortedItems = [...cartItem].sort((a, b) => b.price - a.price);
    setCartItem(sortedItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        setCartItem,
        filterHighestPrice,
        filterLowestPrice,
        quantities,
        updateQuantity,
        handleQuantityChange,
        increaseQnt,
        decreaseQnt,
        deleteItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
