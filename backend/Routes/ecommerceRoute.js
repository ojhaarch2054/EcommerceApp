const express = require('express');
const { getUsers, postUserSignUp} = require('../controller/userController');

const router = express.Router();

//for login and signup
router.get('/users', getUsers);
router.post('/register_users', postUserSignUp);

module.exports = router;