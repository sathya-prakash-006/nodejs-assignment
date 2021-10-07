
const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Upload csv files", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/downloads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    //cb(null, new Date().toISOString() + file.originalname);
    cb(null, `${Date.now()}-transactions-${file.originalname}`);
  },
});

var uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: csvFilter,
});
module.exports = uploadFile;
