const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", (req, res) => {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", (req, res) => {
  res.send(
    "<h1><form action='/store-user' method='POST'><label>Your Name</label> <input type='text' name='username'/><button>Submit</button></form></h1>"
  );
});

app.post("/store-user", (req, res) => {
  const username = req.body.username;

  const filePath = path.join(__dirname, "data", "user.json");
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);
  users.push(username + " ");

  fs.writeFileSync(filePath, JSON.stringify(users));

  res.send("<h1>Username Stored!!`</h1>");
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "user.json");
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);

  res.send(users);
});

app.listen(3000);
console.log("listening on port 3000");
