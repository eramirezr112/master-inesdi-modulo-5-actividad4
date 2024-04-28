const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");

const { checkAuth } = require("../middlewares/auth.middleware");

// POSTS
router.post("/posts", checkAuth, posts.createPost);
router.get("/posts", checkAuth, posts.listPosts);
router.get("/posts/:id", checkAuth, posts.detailPost);
router.patch("/posts/:id", checkAuth, posts.updatePost);
router.delete("/posts/:id", checkAuth, posts.deletePost);

// POSTS
router.get("/users/verify", users.verifyUser);
router.post("/users", users.createUser);

// LOGIN
router.post("/login", users.login);

router.get("/", (req, res) => {
  res.send(`<h1>Master INESDI Modulo 5 | Actividad 4</h1>`);
});

module.exports = router;
