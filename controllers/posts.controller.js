const Post = require("../models/posts.model");

function listPosts(req, res) {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
}

function detailPost(req, res) {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createPost(req, res) {
  Post.create(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function updatePost(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

function deletePost(req, res) {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  listPosts,
  detailPost,
  createPost,
  updatePost,
  deletePost,
};
