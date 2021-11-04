module.exports = checkCookie = (req, res, next) => {
  const cookie = req.cookies.auth;
  if (!cookie) {
    return res.status(401).json({ errors: { msg: 'Unauthorized request' } });
  }

  // set cookie value(userId) assigned to req.userId to pull user info later
  req.userId = req.cookies.auth;

  next();
};
