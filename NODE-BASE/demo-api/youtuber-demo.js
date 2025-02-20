const express = require("express");
const { json } = require("stream/consumers");
const app = express();
app.listen(1234);

let youtuber1 = {
  channelTitle: "십오야",
  sub: "402만명",
  videoNum: "111개",
};

let youtuber2 = {
  channelTitle: "테오",
  sub: "1만명",
  videoNum: "10개",
};

let db = new Map();
let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);

//REST API
app.get("/youtubers", function (req, res) {
  let youtubers = {};
  if (db.size !== 0) {
    db.forEach(function (value, key) {
      youtubers[key] = value;
    });
    res.json(youtubers);
  } else {
    res.status(404).json({
      message: "조회할 유튜버가 없습니다.",
    });
  }
});

app.get("/youtubers/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.status(404).json({
      message: "유튜버 정보 찾을 수 없다",
    });
  } else {
    res.json(youtuber);
  }
});

app.use(express.json()); //http 외 모듈인 '미들웨어':json 설정
app.post("/youtubers", (req, res) => {
  const channelTitle = req.body.channelTitle;
  if (channelTitle) {
    // 등록은 Map(db)에 저장(put) 해줘야한다.
    db.set(id++, req.body);
    res.status(201).json({
      message: `${db.get(id - 1).channelTitle}  님, 유튜버 생활을 응원합니다.`,
    });
  } else {
    res.status(400).json({
      message: "요청 값을 제대로 보내주세요.",
    });
  }
});

//삭제
app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let youtuber = db.get(id);
  const channelTitle = youtuber.channelTitle;
  if (youtuber == undefined) {
    res.json({
      message: `요청하신 ${id}번은 없는 유튜버입니다.`,
    });
  } else {
    db.delete(id);
    res.json({
      message: `${channelTitle}님, 우리 인연은 여기까지`,
    });
  }
});

//전체 삭제
app.delete("/youtubers", function (req, res) {
  if (db.size >= 1) {
    db.clear((msg = "전체 유튜버가 삭제되었습니다."));
  } else {
    msg = "삭제할 유튜버가 없다";
  }
  res.status(404).json({
    message: msg,
  });
});

//수정
app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let youtuber = db.get(id);
  let oldTitle = youtuber.channelTitle;
  if (youtuber == undefined) {
    res.status(404).json({
      message: `요청하신 ${id}번은 없는 유튜버입니다.`,
    });
  } else {
    let newTitle = req.body.channelTitle;
    youtuber.channelTitle = newTitle;
    db.set(id, youtuber);
    res.json({
      message: `${oldTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`,
    });
  }
});
