const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/public/book");
  },
  filename(req, file, cb) {
    const time = Date.now();
    cb(null, `${time}-${file.originalname}`);
  },
});

module.exports = multer({storage})
