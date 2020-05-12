const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/DashboardController.js");
const authorize = require("../middleware/authorize");

//Get all information about the request and results
router.get("/dashboard", authorize(["Admin"]), dashboard.list);

module.exports = router;
