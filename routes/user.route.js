const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// @public-route  POST /api/user
router.post(
  '/',
  // NO NEED TO USE VALIDATION SINCE IT IS DONE ON FRONT-END
  // [
  //   //validator passed in as 2nd arg.
  //   check('email', 'Please enter a valid email').isEmail(),
  //   check('password', 'Password shoul be at least 4 characters.').isLength({
  //     min: 4,
  //   }),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: { msg: 'User already exists' } }); // same error format as validationResult
      }

      // create user variable from the model, not saving it into database
      user = new User({
        name,
        email,
        password,
      });

      //create salt to hash the password with
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); //save user into database

      // generate a cookie with value as 'signedCookie'
      res.cookie('auth', user.id, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      });

      res.send('User registered');
    } catch {
      res.status(500).send('Server error upon registering a user');
    }
  }
);

module.exports = router;
