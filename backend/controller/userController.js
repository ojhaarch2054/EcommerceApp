const axios = require("axios");
const db = require("../models/db");

//to get user
const getUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error.message, error.stack);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//to post user for sign up
const postUserSignUp = async (req, res) => {
  try {
    const { name, email, phone_number, address, password } = req.body;

    //validate input
    if (!name || !email || !password) {
        return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }

    //add new user into the DB
    const result = await db.query(
        "INSERT INTO users (name, email, phone_number, address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, phone_number, address, password]
    );

    //return newly created user
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error signing up user:", error.message, error.stack);
    res.status(500).json({ error: "Failed to sign up user" });
  }
};

module.exports = { getUsers, postUserSignUp };