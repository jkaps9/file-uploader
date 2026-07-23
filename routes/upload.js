const { Router } = require("express");
const router = Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join("/tmp/my-uploads", req.body.folderLocation);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/file/upload", upload.single("file"), function (req, res, next) {
  res.redirect("/");
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 1 }]);

module.exports = router;
