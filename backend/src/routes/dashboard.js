const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/DashboardController.js");

//Get all information about the request and results
router.get("/dashboard", dashboard.list);

module.exports = router;
