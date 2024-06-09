const express = require("express");

const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image.middleware");

const router = express.Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProducts);

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.get("/products/:id", adminController.getProduct);

router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProduct
);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;
