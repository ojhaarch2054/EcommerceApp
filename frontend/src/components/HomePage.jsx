import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "./LogOut";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();
  //state to hold the data from response
  const [productList, setProductList] = useState([]);

  //fetch product list from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/products");
        setProductList(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const logInPageBtn = () => {
    navigate("/logIn");
  };
  const SignUpPageBtn = () => {
    navigate("/sign_up");
  };
  return (
    <>
      {isAuthenticate ? (
        <div>
          <h1>for logged in user</h1>
          <Logout />
          <div className="container mt-4">
            <div className="row">
              {productList.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card">
                    <img
                      src={product.images[0]}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>for non logged in user</h1>
          <button onClick={logInPageBtn} className="btn btn-secondary mx-3">
            Log In
          </button>
          <button onClick={SignUpPageBtn} className="btn btn-secondary">
            Sign Up
          </button>
          <div className="container mt-4">
            <div className="row">
              {productList.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card">
                    <img
                      src={product.images[0]}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
