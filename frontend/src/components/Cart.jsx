import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import NavBar from "./NavBar";

const Cart = () => {
  const { cartItem } = useContext(CartContext);

  const paymentBtn = () => {
    console.log("Payment Clicked");
    alert("You need to login for checkout");
  };

  return (
    <>
    <div className="container my-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      <div className="row">
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={item.images || "img"}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${item.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <h4 className="text-center text-muted">Your cart is empty.</h4>
          </div>
        )}
      </div>
      {cartItem.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={paymentBtn}>
            Proceed To Payment
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Cart;