const { Router } = require("express");
const prisma = require("../database/prismaClient.js");
const router = Router();
const { EntityType } = require("../generated/prisma/client.js");

router.get("/", async (req, res, next) => {
  if (!req.user) {
    return res.render("home");
  }

  const entities = await prisma.entity.findMany({
    where: {
      userId: req.user.id,
      OR: [
        { type: EntityType.FOLDER },
        { AND: [{ type: EntityType.FILE }, { parentId: null }] },
      ],
    },
    orderBy: [
      {
        id: "asc",
      },
      {
        parentId: { sort: "asc", nulls: "first" },
      },
    ],
  });
  next();

  res.render("index", {
    user: req.user,
    entities: entities,
  });
});

module.exports = router;
