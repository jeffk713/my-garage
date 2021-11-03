const express = require('express');
const router = express.Router();

// @public-route  POST user
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('User route'); 
});

module.exports = router;
