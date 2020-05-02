const express = require("express");

const usersRouter = require("./users");
const employeesRouter = require("./employees");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/", employeesRouter);
router.use("/", usersRouter);
router.use("/", adminRouter);

module.exports = router;
