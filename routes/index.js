const { Router } = require("express");
const prisma = require("../database/prismaClient.js");
const router = Router();
const { EntityType } = require("../generated/prisma/client.js");

router.get("/", async (req, res, next) => {
  if (!req.user) {
    return res.render("home");
  }

  next();

  const folders = await prisma.entity.findMany({
    where: {
      userId: req.user.id,
      type: EntityType.FOLDER,
    },
  });
  res.render("index", {
    user: req.user,
    folders: folders,
  });
});

module.exports = router;
