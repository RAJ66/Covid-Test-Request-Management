const express = require("express");
const router = express.Router();
const admin = require("../controllers/AdminController.js");

// Get all admin
router.get("/admins", admin.getAll);

// Get single admin by id
router.get("/admin/:id", admin.getOne);

// Save admin
router.post("/admins", admin.create);

// Edit update
router.put("/admin/:id", admin.update);

// Delete admin
router.delete("/admin/:id", admin.delete);

module.exports = router;
