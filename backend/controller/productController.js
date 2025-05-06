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
      user_id,
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
      images,
      user_id
    );
    //add new product into the products table
    const result = await db.query(
      "INSERT INTO products (title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *",
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
        user_id,
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
const getProductsFromTable = async (req, res) => {
  try {
    //extract id from rqst parameter
    const { user_id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE user_id = $1", [
      user_id,
    ]);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error("Error fetching product:", error.message, error.stack);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

//to update the quantity of the product
const updateQuantity = async (req, res) => {
  try {
    //extract product id and qnt
    const { product_id, quantity } = req.body;
    //validate
    if (!product_id || quantity === undefined) {
      //console.log("missing product id or quantity");
      return res
        .status(400)
        .json({ error: "Product ID and quantity are required" });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }
    //update quantity in the database
    const result = await db.query(
      "UPDATE products SET quantity = $1 WHERE product_id = $2 RETURNING *",
      [quantity, product_id]
    );
    //check if product is updated
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("Quantity updated:", result.rows[0]);
    res
      .status(200)
      .json({
        message: "Quantity updated successfully",
        product: result.rows[0],
      });
  } catch (err) {
    console.error("Server error in updateQuantity:");
    console.error("Error updating quantity:", err.message, err.stack);
    res.status(500).json({ error: "Failed to update quantity" });
  }
};

//to remove cart item
const removeProductsFromCart = async (req, res) => {
  try {
    //extract product id and userid from rqstbody
    const { product_id, user_id } = req.body; 
    //check if both productid and userid are provided
    if (!product_id || !user_id) {
      return res.status(400).json({ error: "Product ID and User ID are required" });
    }
    //delete the product from the products table
    const result = await db.query(
      "DELETE FROM products WHERE product_id = $1 AND user_id = $2 RETURNING *",
      [product_id, user_id]
    );
    //check if the product was deleted
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    //respond with success mesg
    res.status(200).json({
      message: "Product removed from cart successfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.error("Error removing product from cart:", err.message);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

module.exports = {
  saveProduct,
  addProductToTable,
  getProductsFromTable,
  updateQuantity,
  removeProductsFromCart
};
