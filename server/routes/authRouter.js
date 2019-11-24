const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController.js");

router.get("/google", controller.findOrCreateUser);

module.exports = router;
