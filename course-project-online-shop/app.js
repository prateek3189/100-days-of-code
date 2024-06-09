const path = require("path");
const express = require("express");
const csurf = require("csurf");
const expressSession = require("express-session");

const errorHandleMiddleware = require("./middlewares/error.middleware");
const checkAuthStatusMiddleware = require("./middlewares/auth.middleware");
const cartMiddleware = require("./middlewares/cart.middleware");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices.middleware");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const baseRoutes = require("./routes/base.routes");

const db = require("./db/database");
const addCSRFTokenMiddleware = require("./middlewares/csrf.middleware");
const createSessionConfig = require("./config/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use("/admin/scripts", express.static("public/scripts"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(csurf());
app.use(addCSRFTokenMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandleMiddleware);

db.connect()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (err) {
    console.log("Failed to connect");
    console.log(err);
  });
