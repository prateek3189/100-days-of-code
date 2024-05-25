const express = require("express");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputdata;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
      message: "",
    };
  }

  req.session.inputdata = null;
  res.render("signup", {
    inputData: sessionInputData,
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const confirmEmail = userData["confirm-email"];
  const password = userData.password;

  if (
    !email ||
    !confirmEmail ||
    !password ||
    password.trim().length < 6 ||
    email !== confirmEmail ||
    !email.includes("@")
  ) {
    // Save in session
    req.session.inputdata = {
      hasError: true,
      message: "Please enter valid data",
      email: email,
      confirmEmail: confirmEmail,
    };

    req.session.save(function () {
      return res.redirect("/signup");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (existingUser) {
    console.log("User already exists");
    return res.redirect("/signup");
  }

  const user = {
    email: email,
    password: await bcrypt.hash(password, 12),
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const email = userData.email;
  const password = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });
  if (existingUser) {
    const passwordValid = await bcrypt.compare(password, existingUser.password);
    if (!passwordValid) {
      console.log("Password does not match");
      return res.redirect("/login");
    }

    req.session.user = {
      id: existingUser._id.toString(),
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    };
    req.session.isAuthenticated = true;
    req.session.save(function () {
      res.redirect("/admin");
    });
  } else {
    alert("User does not exists");
    return res.redirect("/login");
  }
});

router.get("/admin", async function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: ObjectId.createFromHexString(req.session.user.id) });

  if (res.locals.isAdmin) {
    res.render("admin");
  } else {
    res.status(403).render("403");
  }
});

router.get("/profile", function (req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
