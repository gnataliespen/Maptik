const express = require("express");
const router = express.Router();
const controller = require("../controllers/pinController.js");
const auth = require("../middleware/auth");

router.post("/create", auth, controller.createPin);
router.get("/", controller.getPins);
router.delete("/delete/:id", auth, controller.deletePin);
router.put("/comment", auth, controller.comment);

module.exports = router;
