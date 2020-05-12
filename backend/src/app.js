require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./middleware/session");

//Routes
const indexRouter = require("./routes/index");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo connection succesful"))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Setup session middleware
app.use(sessionMiddleware);

app.use(`/api${process.env.VERSION_API}`, indexRouter);

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
