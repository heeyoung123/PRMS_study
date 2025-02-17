const express = require("express");
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 세팅
// 맨 마지막에 오든 맨 처음에 오든 순서는 상관 없다
// app.listen(1234);

app.get("/hello", (req, res) => {
  res.json({
    say: "안녕하세요",
  });
});
app.get("/bye", (req, res) => {
  res.json({
    say: "안녕히 가세요",
  });
});
app.get("/nicetomeetyou", (req, res) => {
  res.json({
    say: "방가",
  });
});

app.listen(1234);
