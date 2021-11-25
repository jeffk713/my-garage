const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errorMessage: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    req.session.auth = user.id;
    res.json({ username, email, userId: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errorMessage: 'Server error upon user sign-up' });
  }
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: 'User credentials are invalid.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errorMessage: 'User credentials are invalid.' });
    }

    req.session.auth = user.id;

    res.json({ username: user.username, email: user.email, userId: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errorMessage: 'Server error upon user sign-in' });
  }
};

exports.signOutUser = (req, res) => {
  req.session = null;

  res.send('cookie deleted');
};
