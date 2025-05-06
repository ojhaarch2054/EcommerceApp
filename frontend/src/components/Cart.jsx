import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import useAuth from "../context/Hook/useAuth";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const Cart = () => {
  const { cartItem, removeFromCart } = useContext(CartContext);
  const { user, isAuthenticate } = useAuth();
   //store quantity of the product
  const [quantities, setQuantities] = useState({});

  //filter cart items based on the authenticated user id
  const userCartItems = cartItem.filter((item) => item.user_id === user?.id);

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

  const paymentBtn = () => {
    console.log("Payment Clicked");
    if (!isAuthenticate) {
      alert("You need to login for checkout");
    } else {
      alert("Thank you for proceeding payment");
    }
  };

  return (
    <>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0">Shopping Cart</h3>
                {/*for dropdown */}
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Price</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {userCartItems.length > 0 ? (
                userCartItems.map((item, index) => (
                  <div className="card rounded-3 mb-4" key={index}>
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            src={
                              item.images || "https://via.placeholder.com/150"
                            }
                            className="img-fluid rounded-3"
                            alt={item.name}
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">{item.name}</p>
                          <p>{item.title}</p>
                        </div>
                        {/*for add or subtract the item no */}
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <button
                            className="btn px-2 "
                            onClick={() => decreaseQnt(item.product_id)}
                          >
                            subtract
                          </button>
                          <input
                            min="0"
                            name="quantity"
                            type="number"
                            className="form-control form-control-sm"
                            value={quantities[item.product_id] || item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(e, item.product_id)
                            }
                          />
                          <button
                            className="btn px-2"
                            onClick={() => increaseQnt(item.product_id)}
                          >
                            add
                          </button>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">${item.price}</h5>
                        </div>
                        <div className="col-md-1 text-end">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteItems(item.product_id)}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <h4 className="text-center text-muted">
                    Your cart is empty.
                  </h4>
                </div>
              )}
              <div className="card">
                <button
                  type="button"
                  className="btn btn-secondary btn-block btn-lg"
                  onClick={paymentBtn}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
