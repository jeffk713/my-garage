const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

// @public-route  POST /api/user/sign-up
// sign up user and get auth cookie
router.post('/sign-up', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: { msg: 'User already exists' } })
        .select('-password');
    }

    // create user variable from the model, not saving it into database
    user = new User({
      username,
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

    res.send({ username, email });
  } catch {
    res.status(500).send('Server error upon user sign-up');
  }
});

// @public-route  POST /api/user/sign-in
// sign in user and get auth cookie
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: { msg: 'User credentials are invalid.' } });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: { msg: 'User credentials are invalid.' } });
    }

    // generate auth cookie with value as user ID
    res.cookie('auth', user.id, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    res.send({ username: user.username, email: user.email });
  } catch {
    res.status(500).send('Server error upon user sign-in.');
  }
});

router.get('/checkCookie', (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

module.exports = router;
