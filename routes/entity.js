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

router.post("/entity/delete/:id", async (req, res) => {
  try {
    const entityId = parseInt(req.params.id);
    await prisma.entity.delete({
      where: {
        id: entityId,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error("couldn't  delete entity", error);
    res.status(500).send("Error deleting entity");
  }
});

router.post("/entity/rename/:id", async (req, res) => {
  try {
    const entityId = parseInt(req.params.id);
    const { newName } = req.body;

    await prisma.entity.update({
      where: {
        id: entityId,
      },
      data: {
        name: newName,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error("couldn't  delete entity", error);
    res.status(500).send("Error deleting entity");
  }
});

router.get("/folder/:id", async (req, res) => {
  const entityId = parseInt(req.params.id);
  const folder = await prisma.entity.findFirst({
    where: {
      userId: req.userId,
      type: EntityType.FOLDER,
      id: entityId,
    },
  });

  const entities = await prisma.entity.findMany({
    where: {
      userId: req.userId,
      type: EntityType.FILE,
      parentId: entityId,
    },
  });
  res.render("folder", {
    folder: folder,
    entities: entities,
  });
});

module.exports = router;
