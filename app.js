const express = require("express"); // browser 나 front server에서 온것은 req ,, res는 응답에 대한 것
const cors = require("cors");
const app = express(); // get 가져오다 post 생성하다 put 전체 수정 patch 부분수정 delete 제거 options 찔러보기 head 헤더 바디 만 가져오기
// 애매하면 post 합의해서 잘 합시다.
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");

dotenv.config();

app.use(
  cors({
    origin: "*", // 보안상 이슈가 있어서 실무에선 origin을 제대로 설정
    credentials: false,
  })
);
passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // body 에다가 넣어주는 역할
app.use(cookieParser(process.env.COOKIE_SECRET)); // 실제 정보대신에 랜덤문자를 브라우저(해킹취약)에 송출 백엔드도 쿠키를 사용해서 호환
// 쿠키는 아이디랑 1:1 매칭,
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // 보안을 위해 숨기는 작업
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
