const Post = require("../models/Post");
const User = require("../models/User");

const router = require("express").Router();

//create
router.post("/", async (req, res) => {
  const { content, userId } = req.body;

  if (content == null || userId == null) {
  }
  if (content.length == 0) {
    return res.status(400).json({
      error: "Empty post",
    });
  }
  const post = await Post.create({ content, userId });
  return res.json({
    post,
  });
});

// get all
router.get("/", async (req, res) => {
  const posts = await Post.findAll({ include: User });

  res.json({
    posts,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({
      error: "Post not found",
    });
  }

  res.json({
    post,
  });
});

module.exports = router;
