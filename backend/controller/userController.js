const axios = require("axios");
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../models/db")

dotenv.config();

//fun to create a jwt token with the user id
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.secretKey, { expiresIn: "15m" });
};
//fun to create refresh token
const refreshTokenKey = (id, role) => {
  return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7h" });
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
    console.log("Request body:", req.body);
    //validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Password hashed successfully");
    //add new user into the DB
    const result = await db.query(
      "INSERT INTO users (name, email, phone_number, address, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, phone_number, address, hashedPassword, role]
    );
    console.log("User added to table:", result.rows[0]);
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
    const refreshT = refreshTokenKey(user.id, user.role);

    //set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshT, {
      httpOnly: true,
      maxAge: 7 * 60 * 60 * 1000,
    });

    console.log("JWT token set:", token);
    //send the user data and roles in the response
    res.status(200).json({
      id: user.id,
      token: token,
      user: user.email,
      roles: user.role,
      refreshtoken: refreshT,
    });
    console.log(res.status);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


//for logout
const logOut = async (req, res) => {
  try {
    //to clear token cokieeeee
    res.clearCookie("jwt");
    res.clearCookie("refreshToken");
    res.status(200).send("Logged out successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to log out.");
  }
};

//for refresh token
const refreshToken = async (req, res) => {
  console.log("Cookies received:", req.cookies);
  //extract the refresh token from the cokies in the rqst
  const refreshToken = req.cookies.refreshToken;
  console.log("Received refresh token:", refreshToken);

  //if not then send 401 code
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    //verify the refresh token using secret key
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("Refresh token decoded:", decoded);

    //create new access token with the user ID and role, valid for 15 min
    const newToken = createToken(decoded.id, decoded.role);

    console.log("New access token created:", newToken);

    //set the new access token as a cookie in the response
    res.cookie("jwt", newToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    
    //send the new access token in the response body
    res.status(200).json({ token: newToken });
  } catch (err) {
    //if the refresh token is invalid log the 403 Forbidden error
    console.error(err);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

module.exports = { getUsers, postUserSignUp, postUserLogIn, logOut, refreshToken};
