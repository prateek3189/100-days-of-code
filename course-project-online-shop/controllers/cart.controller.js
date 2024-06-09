const Product = require("../models/product.model");

async function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
  let product;
  try {
    const product = await Product.findById(req.body.productId);
    const cart = res.locals.cart;

    res.locals.cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
      message: "Cart updated successfully",
      newTotalItems: cart.totalQuantity,
    });
  } catch (e) {
    next(e);
  }
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemData = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );
  req.session.cart = cart;
  res.json({
    message: "Item updated",
    newTotalQuantity: cart.totalQuantity,
    newTotalPrice: cart.totalPrice,
    updatedItemPrice: updatedItemData.updateItemPrice,
  });
}

module.exports = {
  addCartItem,
  getCart,
  updateCartItem,
};
