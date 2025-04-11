const axios = require("axios");
const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.configDotenv();

//fun to create a jwt token with the user id
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.secretKey, { expiresIn: "15m" });
};

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
  const saltRounds = 10;
  try {
    const {
      name,
      email,
      phone_number,
      address,
      password,
      role = "admin",
    } = req.body;
    console.log("Received role:", role);

    //validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //add new user into the DB
    const result = await db.query(
      "INSERT INTO users (name, email, phone_number, address, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, phone_number, address, hashedPassword, role]
    );
    console.log("added to table: " + result);
    //return newly created user
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error signing up user:", error.message, error.stack);
    res.status(500).json({ error: "Failed to sign up user" });
  }
};

//to login
const postUserLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("select * from users where email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const user = result.rows[0];
    //compare pw with hashed
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    //create a token for the user
    const token = createToken(user.id, user.role);
    //set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 15 * 60 * 1000 });

    console.log("JWT token set:", token);
    //send the user data and roles in the response
    res.status(200).json({
      id: user.id,
      token: token,
      user: user.email,
      roles: user.role,
    });
    console.log(res.status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getUsers, postUserSignUp, postUserLogIn };
