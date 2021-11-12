const express = require('express');
const router = express.Router();

const {
  signUpUser,
  signInUser,
  signOutUser,
} = require('../controller/user.controller');

// @public-route  POST /api/user/sign-up
// sign up user and get auth cookie
router.post('/sign-up', signUpUser);

// @public-route  POST /api/user/sign-in
// sign in user and get auth cookie
router.post('/sign-in', signInUser);

// @public-route  GET /api/user/sign-out
// sign out user and clear auth cookie
router.get('/sign-out', signOutUser);

module.exports = router;
