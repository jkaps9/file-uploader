require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const passport = require("passport");
const sessionConfig = require("./config/session");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");
const entityRouter = require("./routes/entity");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", uploadRouter);
app.use("/", entityRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
