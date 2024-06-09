const Product = require("../models/product.model");
const Order = require("../models/order.modal");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
  }
}

function getNewProducts(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = new Product({
      ...req.body,
      _id: req.params.id,
    });

    if (req.file) {
      // replace the old image with the new image
      product.replaceImage(req.file.filename);
    }

    try {
      await product.save();
    } catch (error) {
      next(error);
      return;
    }
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.deleteProduct();
  } catch (error) {
    return next(error);
  }

  res.json({
    message: "Product deleted successfully",
    status: 200,
  });
}

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("admin/orders/admin-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;

    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getNewProducts,
  createNewProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrder,
};
