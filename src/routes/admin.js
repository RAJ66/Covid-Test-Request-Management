const express = require("express");
const router = express.Router();
const admin = require("../controllers/AdminController.js");

// Get all admin
router.get("/", function (req, res) {
  admin.list(req, res);
});

// Get single admin by id
router.get("/show/:id", function (req, res) {
  admin.show(req, res);
});

// Create admin
router.get("/create", function (req, res) {
  admin.create(req, res);
});

// Save admin
router.post("/save", function (req, res) {
  admin.save(req, res);
});

// Edit admin
router.get("/edit/:id", function (req, res) {
  admin.edit(req, res);
});

// Edit update
router.post("/update/:id", function (req, res) {
  admin.update(req, res);
});

// Delete admin
router.post("/delete/:id", function (req, res, next) {
  admin.delete(req, res);
});

module.exports = router;
