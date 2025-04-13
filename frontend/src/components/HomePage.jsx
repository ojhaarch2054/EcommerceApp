import { useState, useEffect, useContext } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { CartContext } from "../context/CartContext";

const HomePage = () => {
  //state to hold the data from response
  const [productList, setProductList] = useState([]);
  //access addtocart function
  const { addToCart } = useContext(CartContext);

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

  return (
    <div>
       <NavBar />
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
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
