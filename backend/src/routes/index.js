const express = require("express");

const usersRouter = require("./users");
const employeesRouter = require("./employees");
const adminRouter = require("./admin");
const requestRouter = require("./requests");

const router = express.Router();

router.use("/", employeesRouter);
router.use("/", usersRouter);
router.use("/", adminRouter);
router.use("/", requestRouter);

module.exports = router;
