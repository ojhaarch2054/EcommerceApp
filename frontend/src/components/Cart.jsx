import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import useAuth from "../context/Hook/useAuth";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/cartCard.css";

const Cart = () => {
  const {
    cartItem,
    filterHighestPrice,
    filterLowestPrice,
    increaseQnt,
    decreaseQnt,
    handleQuantityChange,
    quantities,
    deleteItems,
  } = useContext(CartContext);
  const { user, isAuthenticate } = useAuth();

  //filter cart items based on the authenticated user id
  const userCartItems = useMemo(
    () => cartItem.filter((item) => item.user_id === user?.id),
    [cartItem, user]
  );

  const paymentBtn = () => {
    console.log("Payment Clicked");
    if (!isAuthenticate) {
      alert("You need to login for checkout");
    } else {
      alert("Thank you for proceeding payment");
    }
  };

  //calculate subtottal
  const subtotal = userCartItems.reduce((total, item) => {
    const itemTotal =
      item.price * (quantities[item.product_id] || item.quantity);
    return total + itemTotal;
  }, 0);

  return (
    <>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 headingCart">Shopping Cart</h3>
                {/*for dropdown */}
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Sort by
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#" onClick={filterLowestPrice}>
                        Lowest Price
                      </Dropdown.Item>
                      <Dropdown.Item href="#" onClick={filterHighestPrice}>
                        Highest Price
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {userCartItems.length > 0 ? (
                userCartItems.map((item, index) => (
                  <div
                    className="card cartCard rounded-3 mb-4 px-5"
                    key={index}
                  >
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
                        {isAuthenticate && (
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button
                              className="btn px-2 inputField"
                              onClick={() => decreaseQnt(item.product_id)}
                            >
                              subtract
                            </button>
                            <input
                              min="1"
                              name="quantity"
                              type="number"
                              className="form-control form-control-sm  inputField "
                              value={
                                quantities[item.product_id] || item.quantity
                              }
                              onChange={(e) =>
                                handleQuantityChange(e, item.product_id)
                              }
                            />
                            <button
                              className="btn px-2 inputField"
                              onClick={() => increaseQnt(item.product_id)}
                            >
                              add
                            </button>
                          </div>
                        )}
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 ">
                          <small className="text-muted ">
                            Unit Price: ${item.price}
                          </small>
                          <br />
                          <br />
                          <strong>
                            Total: $
                            {(
                              item.price *
                              (quantities[item.product_id] || item.quantity)
                            ).toFixed(2)}
                          </strong>
                        </div>
                        <div className="col-md-1 text-end">
                          {isAuthenticate && (
                            <button
                              className="btn btn-danger btn-sm p-2"
                              onClick={() => deleteItems(item.product_id)}
                            >
                              Delete
                            </button>
                          )}
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
              {isAuthenticate ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="text-end">
                      Subtotal: ${subtotal.toFixed(2)}
                    </h5>
                    <button
                      type="button"
                      className="btn btn-secondary btn-block btn-lg payBtn"
                      onClick={paymentBtn}
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block btn-lg payBtn"
                    onClick={paymentBtn}
                  >
                    Proceed to Pay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
