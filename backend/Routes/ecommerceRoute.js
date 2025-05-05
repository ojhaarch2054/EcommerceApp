const express = require('express');
const { getUsers, postUserSignUp, postUserLogIn,logOut, refreshToken} = require('../controller/userController');
const { fetchUsers, authorizeRole } = require('../middleware/authenticationMiddleware');
const { saveProduct, addProductToTable, getProductsFromTable, updateQuantity } = require('../controller/productController.js');

const router = express.Router();

//for login and signup
router.get('/users', getUsers);
router.post('/register_users', postUserSignUp);
router.post('/logIn_users', postUserLogIn);
router.post('/logout', fetchUsers, logOut);
router.post('/refresh-token', refreshToken);

//for products

router.get("/products", saveProduct);
router.post("/add_product", addProductToTable);
router.get('/cartItems/:user_id', getProductsFromTable);
router.put('/products/:id/quantity', updateQuantity)
module.exports = router;