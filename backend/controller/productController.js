const axios = require("axios");
const db = require("../models/db");

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

//to post product to product table
const addProductToTable = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount_percentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    } = req.body;
    console.log(
      "Received product:",
      title,
      description,
      price,
      discount_percentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images
    );
    //add new product into the products table
    const result = await db.query(
      "INSERT INTO products (title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *",
      [
        title,
        description,
        price,
        discount_percentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      ]
    );
    console.log("product added:", result.rows[0]);
    //return newly created product
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error posting product:", error.message, error.stack);
    res.status(500).json({ error: "Failed to add product" });
  }
};

//fetch data from product table
const getProductsFromTable = async(req, res) => {
  try{
    const result = await db.query("select * from products");
    res.status(201).json(result.rows)
    
  }catch (error) {
    console.error("Error fetching product:", error.message, error.stack);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

module.exports = { saveProduct, addProductToTable, getProductsFromTable };
