const { Router } = require("express");
const router = Router();
const prisma = require("../database/prismaClient.js");
const { EntityType } = require("../generated/prisma/client.js");

router.post("/folder/create", async (req, res) => {
  try {
    await prisma.entity.create({
      data: {
        name: req.body.folderName,
        type: EntityType.FOLDER,
        userId: req.user.id,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
