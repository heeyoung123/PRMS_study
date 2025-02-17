const express = require("express");
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 세팅
// 맨 마지막에 오든 맨 처음에 오든 순서는 상관 없다
// app.listen(1234);

app.get("/test", (req, res) => {
  res.send("Test");
});
app.get("/test1", (req, res) => {
  res.send("one");
});

let nodejsBook = {
  title: "Node.js를 공부해보자",
  price: 20000,
  description: "이 책 좋음",
};
app.get("/products/1", (req, res) => {
  res.json(nodejsBook);
});
app.listen(1234);
