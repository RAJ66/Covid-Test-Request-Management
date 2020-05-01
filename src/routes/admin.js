const express = require("express");
const router = express.Router();
const admin = require("../controllers/AdminController.js");

// Get all admin
router.get("/", admin.list);

// Get single admin by id
router.get("/show/:id", admin.show);

// Save admin
router.post("/save", admin.save);

// Edit update
router.post("/update/:id", admin.update);

// Delete admin
router.post("/delete/:id", admin.delete);

module.exports = router;
