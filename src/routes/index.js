var express = require("express");
var router = express.Router();

var multer = require("multer");
const uploadConfig = require("../utils/upload");
const upload = multer(uploadConfig);

const uploadController = require("../controllers/indexController");

router.get("/", uploadController.page);

router.post("/", upload.single("avatar"), uploadController.upload);

module.exports = router;
