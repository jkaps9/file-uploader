const { Router } = require("express");
const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/file/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file);
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 1 }]);

module.exports = router;
