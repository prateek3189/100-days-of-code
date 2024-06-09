const express = require("express");

const db = require("./data/database");
const quoteRoutes = require("./routes/quote.routes");

const enableCors = require("./middleware/cors");

const app = express();

app.use(enableCors);

app.use("/quote", quoteRoutes);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong",
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (err) {
    console.log("Connection error: " + err);
  });
