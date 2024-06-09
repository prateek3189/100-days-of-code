const express = require("express");

const orderController = require("../controllers/order-controller");

const router = express.Router();

router.post("/", orderController.addOrder);

router.get("/", orderController.getOrders);

module.exports = router;
