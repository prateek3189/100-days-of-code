const path = require("path");

const express = require("express");

const db = require("./data/database");
const mainRoutes = require("./routes/main.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// Could add more middleware - e.g. session, body parsers etc.

app.use(mainRoutes);

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});
let PORT = 3000;

if (process.env.PORT) {
  PORT = process.env.PORT;
}

db.initDatabase()
  .then(function () {
    app.listen(PORT);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
