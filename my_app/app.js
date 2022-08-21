require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const adminRouter = require("./routes/admin");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const clientRouter = require("./routes/teacher");
const superAdminRouter = require("./routes/superAdmin");
const methodOverride = require("method-override");
const recruitRouter = require("./routes/recruit");
var app = express();
const mongo_connection_url =
  process.env.MONGO_DB_ATLAS_URL || "mongodb://localhost:27017/Edu";
mongoose
  .connect(mongo_connection_url)
  .then(() => {
    console.log("Connected to the mongo DB database");
  })
  .catch((err) => {
    console.log("Error occured while connected to the database = ", err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/client", clientRouter);
app.use("/superAdmin", superAdminRouter);
app.use("/recruit", recruitRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
