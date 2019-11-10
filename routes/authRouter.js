const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController.js");
const auth = require("../middleware/auth");

router.get("/google", auth, controller.findOrCreateUser);

module.exports = router;
