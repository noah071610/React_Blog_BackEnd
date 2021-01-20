const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    // 데이터는 보통 제이슨으로 많이함
    { id: 1, content: "hello" },
  ]);
});
router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
