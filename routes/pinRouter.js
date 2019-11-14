const express = require("express");
const router = express.Router();
const controller = require("../controllers/pinController.js");

router.get("/", controller.getPins);

module.exports = router;
