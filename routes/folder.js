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

router.post("/folder/delete/:id", async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);
    await prisma.entity.delete({
      where: {
        id: folderId,
        type: EntityType.FOLDER,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error("couldn't  delete folder", error);
    res.status(500).send("Error deleting folder");
  }
});

router.post("/folder/rename/:id", async (req, res) => {
  try {
    const folderId = parseInt(req.params.id);
    const { newName } = req.body;

    await prisma.entity.update({
      where: {
        id: folderId,
        type: EntityType.FOLDER,
      },
      data: {
        name: newName,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error("couldn't  delete folder", error);
    res.status(500).send("Error deleting folder");
  }
});

module.exports = router;
