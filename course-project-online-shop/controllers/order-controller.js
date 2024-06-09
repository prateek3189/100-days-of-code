const stripe = require("stripe");
const stripeObject = stripe(
  "sk_test_51Md5pmSDld2GLViLyK3zsDrSKwf0oreuH27SN5OEUUa1xu2h0G1CUPm2Qg2pZE3jkm3nWEPELMXHA4wumjRFtRZt00T2v679HN"
);

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

    // Stripe Payment
    const lineItems = cart.items.map(function (item) {
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "USD",
          product_data: {
            name: item.product.title,
          },
          unit_amount_decimal: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripeObject.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/orders/success`,
      cancel_url: `http://localhost:3000/orders/failure`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    return next(err);
  }
}

function getSuccess(req, res) {
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder,
  getOrders,
  getSuccess,
  getFailure,
};
