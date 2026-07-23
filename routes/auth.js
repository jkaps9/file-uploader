const { Router } = require("express");
const passport = require("passport");
const router = Router();

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/signup", (req, res) => res.render("signup"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
);

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
