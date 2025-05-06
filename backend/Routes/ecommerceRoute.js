const express = require('express');
const { getUsers, postUserSignUp, postUserLogIn,logOut, refreshToken, updateUserProfile} = require('../controller/userController');
const { fetchUsers, authorizeRole } = require('../middleware/authenticationMiddleware');
const { saveProduct, addProductToTable, getProductsFromTable, updateQuantity, removeProductsFromCart } = require('../controller/productController.js');

const router = express.Router();

//for login and signup
router.get('/users', getUsers);
router.post('/register_users', postUserSignUp);
router.post('/logIn_users', postUserLogIn);
router.post('/logout', fetchUsers, logOut);
router.post('/refresh-token', refreshToken);
router.put('/updateProfile', updateUserProfile)

//for products

router.get("/products", saveProduct);
router.post("/add_product", addProductToTable);
router.get('/cartItems/:user_id', getProductsFromTable);
router.put('/products/:id/quantity', updateQuantity)
router.delete('/products/:id', removeProductsFromCart);


module.exports = router;