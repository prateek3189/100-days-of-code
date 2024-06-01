const Post = require("../models/post");

const ValidationSession = require("../util/validation-session");
const ValidationPost = require("../util/validation");

function getHome(req, res) {
  res.render("welcome");
}

async function getAdmin(req, res) {
  const posts = Post.getAll();

  const sessionInputData = ValidationSession.getSessionErrorData(req, {
    title: "",
    content: "",
  });

  res.render("admin", {
    posts: posts,
    inputData: sessionInputData,
  });
}

async function createPosts(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!ValidationPost.postIsValid(enteredTitle, enteredContent)) {
    ValidationSession.flashErrorToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/admin`);
      }
    );

    const post = new Post(enteredTitle, enteredContent);

    await post.save();

    res.redirect("/admin");
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  res.redirect("/admin");
}

async function getSinglePost(req, res) {
  let post;
  try {
    post = new Post(null, null, req.params.id);
  } catch (error) {
    return next(error);
  }

  await post.fetch();

  if (!post.title || !post.title.content) {
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionInputData = ValidationSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionInputData,
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!ValidationPost.postIsValid(enteredTitle, enteredContent)) {
    ValidationSession.flashErrorToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  const post = new Post(enteredTitle, enteredContent, req.params.id);

  await post.save();
  res.redirect("/admin");
}

async function deletePost(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();
  res.redirect("/admin");
}

module.exports = {
  getHome,
  getAdmin,
  createPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
