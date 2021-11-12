const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// @public-route  POST /api/user/sign-up
// sign up user and get auth cookie
router.post('/sign-up', userController.signUpUser);

// @public-route  POST /api/user/sign-in
// sign in user and get auth cookie
router.post('/sign-in', userController.signInUser);

// @public-route  GET /api/user/sign-out
// sign out user and clear auth cookie
router.get('/sign-out', userController.signOutUser);

module.exports = router;
