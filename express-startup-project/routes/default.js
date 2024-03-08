const express = require("express");

const router = express.Router();
// index
router.get("/", function (req, res) {
  res.render("index");
});

// About
router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;
