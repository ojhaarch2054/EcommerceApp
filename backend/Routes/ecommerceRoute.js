const express = require('express');
const { getUsers, postUserSignUp, postUserLogIn} = require('../controller/userController');

const router = express.Router();

//for login and signup
router.get('/users', getUsers);
router.post('/register_users', postUserSignUp);
router.post('/logIn_users', postUserLogIn);


module.exports = router;