require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/", authRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
