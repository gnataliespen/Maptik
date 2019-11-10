const express = require("express");
const router = express.Router();
const controller = require("../controllers/pinController.js");
const auth = require("../middleware/auth");

router.post("/create", auth, controller.createPin);

module.exports = router;
