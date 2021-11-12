module.exports = checkCookie = (req, res, next) => {
  // const cookie = req.cookies.auth;
  const userId = req.session.auth // grab encrypted cookie

  if (!userId) {
    return res.status(401).json({ errors: { msg: 'Unauthorized request' } });
  }

  // set cookie value(userId) assigned to req.userId to pull user info later
  // req.userId = req.cookies.auth;
  req.userId = userId

  next();
};
