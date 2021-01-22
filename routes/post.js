const express = require("express");
const { Post, Comment, Image } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      // 데이터는 보통 제이슨으로 많이함
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      inclue: [{ model: Image }, { model: Comment }, { model: User }],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // :은 동적 파라미터
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("no exist post");
    }
    const comment = await Comment.create({
      // 데이터는 보통 제이슨으로 많이함
      content: req.body.content,
      PostId: req.params.postId, // 위에 동적 파라미터 접근
      User: req.user.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
