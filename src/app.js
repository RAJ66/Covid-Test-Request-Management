const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const employees = require("./routes/employees");
const adminRouter = require("./routes/admin");



const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// If using MongoAtlas uncomment the next line and complete the link with your cluster
//mongoose.connect('mongodb+srv://YOUR_MONGO_ATLAS_LINK', {useNewUrlParser: true} )
mongoose
  .connect("mongodb://localhost/test", { useNewUrlParser: true })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/employees", employees);
app.use("/admin", adminRouter);


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
