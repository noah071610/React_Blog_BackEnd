const express = require("express"); // browser 나 front server에서 온것은 req ,, res는 응답에 대한 것
const cors = require("cors");

const app = express(); // get 가져오다 post 생성하다 put 전체 수정 patch 부분수정 delete 제거 options 찔러보기 head 헤더 바디 만 가져오기
// 애매하면 post 합의해서 잘 합시다.

const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");
const passport = require("passport");

dotenv.config();
app.use(morgan("dev")); // morgan은 백엔드 디버깅 헬프툴
app.use(cookieParser(process.env.COOKIE_SECRET)); // 실제 정보대신에 랜덤문자를 브라우저(해킹취약)에 송출 백엔드도 쿠키를 사용해서 호환
app.use(
  cors({
    origin: "http://localhost:3000", // true도 됨
    credentials: true, // 이래야지 쿠키도 같이 전달됨
  })
);
app.use("/", express.static(path.join(__dirname, "uploads"))); // localhost3065 에 image 파일들을 접근

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // body 에다가 넣어주는 역할
// 쿠키는 아이디랑 1:1 매칭,
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // 보안을 위해 숨기는 작업
  })
);

passportConfig();
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
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
