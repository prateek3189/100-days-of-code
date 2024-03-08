const express = require("express");
const path = require("path");

const defaultRoutes = require("./routes/default");
const restaurentsRoutes = require("./routes/restaurents");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restaurentsRoutes);

// 404
app.use(function (req, res) {
  res.status(404).render("404");
});

// 500
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
