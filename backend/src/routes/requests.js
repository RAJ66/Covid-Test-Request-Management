const express = require("express");
const multer = require("multer");
const router = express.Router();
const request = require("../controllers/RequestController.js");
const authorize = require("../middleware/authorize");
const uploadConfig = require("../utils/upload");
const upload = multer(uploadConfig);

//Get all requests
router.get(
  "/requests",
  authorize(["Admin", "Employee", "User"]),
  request.getAll
);

//Save request
router.post("/requests", authorize(["User"]), request.create);

//Get a single request by id
router.get(
  "/request/:id",
  authorize(["Admin", "Employee", "User"]),
  request.getOne
);

//Edit/Update request
router.put("/request/:id", authorize(["Admin", "Employee"]), request.update);

router.put("/request/:id/image", upload.single("image"), request.updateImage);

//Delete request
router.delete("/request/:id", authorize(["Admin", "Employee"]), request.delete);

module.exports = router;
