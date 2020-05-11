const express = require("express");

const usersRouter = require("./users");
const requestRouter = require("./requests");
const dashboardRouter = require("./dashboard");

const router = express.Router();

router.use("/", usersRouter);
router.use("/", requestRouter);
router.use("/", dashboardRouter);

module.exports = router;
