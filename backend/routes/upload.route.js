const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { uploadImage } = require("../controllers/upload.controller");

router.post("/", upload.single("file"), uploadImage);

module.exports = router;
