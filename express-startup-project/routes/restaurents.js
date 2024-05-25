const express = require("express");

const router = express.Router();

const {
  getRestaurents,
  storedRestaurents,
} = require("../util/restaurent-data");
const uuid = require("uuid");

// Restaurents
router.get("/restaurents", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const restaurentData = getRestaurents();
  restaurentData.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resA.name < resB.name)
    ) {
      return 1;
    }
    return -1;
  });
  res.render("restaurents", {
    noOfRestaurents: restaurentData.length,
    restaurents: restaurentData,
    nextOrder: nextOrder,
  });
});

// Restaurent Details
router.get("/restaurents/:id", function (req, res) {
  const id = req.params.id;
  const restaurentData = getRestaurents();
  for (restaurent of restaurentData) {
    if (restaurent.id === id) {
      res.render("restaurent-details", {
        restaurent,
      });
    }
    res.status(404).render("404");
  }
});

// Confirm
router.get("/confirm", function (req, res) {
  res.render("confirm");
});

// Recommend - GET
router.get("/recommend", function (req, res) {
  res.render("recommend");
});

// Recommend - POST
router.post("/recommend", function (req, res) {
  const restaurent = { ...req.body, id: uuid.v4() };
  const restaurentData = getRestaurents();

  restaurentData.push(restaurent);

  storedRestaurents(restaurentData);

  res.redirect("/confirm");
});

module.exports = router;
