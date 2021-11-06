const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// @public-route  POST /api/auth
// sign in user and get auth cookie
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { msg: 'User doest not exist.' } });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    if (password !== user.password) {
      return res.status(400).json({ errors: { msg: 'User credentials are invalid.' } });
    }

    // generate auth cookie with value as user ID
    res.cookie('auth', user.id, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.send('User signed in');
  } catch {
    res.status(500).send('Server error upon user sign in.');
  }
});

module.exports = router;
