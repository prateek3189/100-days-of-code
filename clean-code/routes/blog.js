const express = require("express");
const Post = require("../models/post");
const blogController = require("../controllers/post-controller");
const protectRoute = require("../middleware/auth-protection");

const router = express.Router();

router.get("/", blogController.getHome);

// All the routesd after this middleware will be protected
router.use(protectRoute);

router.get("/admin", blogController.getAdmin);

router.post("/posts", blogController.createPosts);

router.get("/posts/:id/edit", blogController.getSinglePost);

router.post("/posts/:id/edit", blogController.updatePost);

router.post("/posts/:id/delete", blogController.deletePost);

module.exports = router;
