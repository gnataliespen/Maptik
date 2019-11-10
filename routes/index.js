const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  console.log("hi");
  res.send("home");
});

module.exports = router;
