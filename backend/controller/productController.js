const axios = require("axios");

//to fetch products from an API
const saveProduct = async (req, res) => {
  try {
    //get request to api
    const response = await axios.get("https://dummyjson.com/products");

    //extract product data from response
    const products = response.data.products;

    //send products as a response
    res.status(200).json(products);
  } catch (error) {
    //handle err
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


module.exports = { saveProduct};