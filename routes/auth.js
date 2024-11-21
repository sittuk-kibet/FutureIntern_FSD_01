const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
} = require('../controllers/authControllers'); //importing controllers

const router = express.Router();

//Route for user registration
router.post('/register', registerUser);
//Route for user login
router.post('/login', loginUser);

//route for user logout
router.get('/logout', loginUser);

module.exports = router;