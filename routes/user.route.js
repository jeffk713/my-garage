const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// @public-route  POST /api/user
// register user and get auth cookie
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: { msg: 'User already exists' } });
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

    // generate auth cookie with value as user ID
    res.cookie('auth', user.id, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.send('User registered');
  } catch {
    res.status(500).send('Server error upon registering a user');
  }
});

// @public-route  POST /api/user
router.get('/')

module.exports = router;
