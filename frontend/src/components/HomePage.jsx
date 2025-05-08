import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/homePage.css";
import Carousel from "./Carousel";

const HomePage = () => {
  //state to hold the data from response
  const [productList, setProductList] = useState([]);
  const { addToCart} = useContext(CartContext);
  //to store sorted list
  const [sortedProductList, setSortedProductList] = useState([]);

  //fetch product list from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:3000/products");
        setProductList(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Error fetching products:");
      }
    };
    fetchProducts();
  }, []);

  //sort by lowest price
  const filterLowestPrice = () => {
    const sortedItems = [...productList].sort((a, b) => a.price - b.price);
    setSortedProductList(sortedItems);
  };

  //sort by highest price
  const filterHighestPrice = () => {
    const sortedItems = [...productList].sort((a, b) => b.price - a.price);
    setSortedProductList(sortedItems);
  };

  return (
    <div className="homePage mt-0">
      <Carousel />
      <div className="container mt-4 ">
        {/*for dropdown */}
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <div className="flex-grow-1 text-center">
            <h3 className="mb-3 ">Find Your Favorites</h3>
          </div>
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
        <div className="row">
          {(sortedProductList.length > 0 ? sortedProductList : productList).map(
            (product) => (
              <div className="col-md-3 col-sm-6 mb-4" key={product.id}>
                <div className="card homepageCard shadow-lg p-3 rounded">
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
                      className="btn addCartBtn"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
