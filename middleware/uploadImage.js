const multer = require('multer');

module.exports = uploadImage = multer({
  limits: {
    filesize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('File must be an image file'));
    }
    callback(undefined, true);
  },
});
