const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// index
app.get("/", function (req, res) {
  // const filePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(filePath);

  // As We are using EJS
  res.render("index");
});

// About
app.get("/about", function (req, res) {
  res.render("about");
});

// Restaurents
app.get("/restaurents", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurents.json");

  const fileData = fs.readFileSync(filePath);
  const restaurentData = JSON.parse(fileData);
  res.render("restaurents", {
    noOfRestaurents: restaurentData.length,
    restaurents: restaurentData,
  });
});

// Confirm
app.get("/confirm", function (req, res) {
  res.render("confirm");
});

// Recommend - GET
app.get("/recommend", function (req, res) {
  res.render("recommend");
});

// Recommend - POST
app.post("/recommend", function (req, res) {
  const restaurent = req.body;
  const filePath = path.join(__dirname, "data", "restaurents.json");

  const fileData = fs.readFileSync(filePath);
  const restaurentData = JSON.parse(fileData);

  restaurentData.push(restaurent);

  fs.writeFileSync(filePath, JSON.stringify(restaurentData));

  res.redirect("/confirm");
});

app.listen(3000);
