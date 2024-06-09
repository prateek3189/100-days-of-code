const Order = require("../models/order.modal");
const User = require("../models/user.model");

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
    const order = new Order(cart, userDocument);
    await order.save();
    req.session.cart = null;

    res.redirect("/orders");
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  addOrder,
  getOrders,
};
