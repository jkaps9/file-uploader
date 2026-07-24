const { Router } = require("express");
const router = Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const prisma = require("../database/prismaClient.js");
const { EntityType } = require("../generated/prisma/client.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = path.join(
      "/tmp/my-uploads",
      req.body.folderLocation || "",
    );

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

router.post("/file/upload", upload.single("file"), async (req, res, next) => {
  const folderLocation = parseInt(req.body.folderLocation);

  try {
    await prisma.entity.create({
      data: {
        name: req.file.originalname,
        type: EntityType.FILE,
        size: req.file.size,
        mimeType: req.file.mimetype,
        parentId: folderLocation,
        userId: req.user.id,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.redirect("/");
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 1 }]);

module.exports = router;
