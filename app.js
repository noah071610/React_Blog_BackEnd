const express = require("express"); // browser 나 front server에서 온것은 req ,, res는 응답에 대한 것

const app = express(); // get 가져오다 post 생성하다 put 전체 수정 patch 부분수정 delete 제거 options 찔러보기 head 헤더 바디 만 가져오기
// 애매하면 post 합의해서 잘 합시다.
const postRouter = require("./routes/post");
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
