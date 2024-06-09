const express = require("express");

const quoteController = require("../controller/quote.controller");

const router = express.Router();

router.get("/", quoteController.getRandomQuotes);

module.exports = router;
