const express = require("express");

const usersRouter = require("./users");
const requestRouter = require("./requests");
const dashboardRouter = require("./dashboard");
const sessionRouter = require("./session");

const router = express.Router();

router.use("/", usersRouter);
router.use("/", requestRouter);
router.use("/", dashboardRouter);
router.use("/", sessionRouter);

module.exports = router;
