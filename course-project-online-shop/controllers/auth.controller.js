const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const Validation = require("../util/validation");

const sessionFlash = require("../util/session-flash");

function getSignup(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      confirmEmail: "",
      fullName: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullName: req.body["full-name"],
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  if (
    !Validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body["full-name"],
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !Validation.emailIsEquals(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Please check your inputs!!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body["full-name"],
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const userExist = await user.existsAlready();
    if (userExist) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User already exists",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function logout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect("/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Invalid credentials - Please enter correct email and password",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const passwordIsCorrect = await user.comparePassword(existingUser.password);
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Invalid credentials - Please enter correct email and password",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function getLogin(req, res, next) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

module.exports = {
  getSignup,
  getLogin,
  signup,
  login,
  logout,
};
