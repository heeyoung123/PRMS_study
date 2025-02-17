const express = require("express");
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
app.get("/yout", function (req, res) {
  res.json();
});
app.get("/youtuber/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  const youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({
      message: "유튜버 정보 찾을 수 없다",
    });
  } else {
    res.json(youtuber);
  }
});

app.use(express.json()); //http 외 모듈인 '미들웨어':json 설정
app.post("/youtuber", (req, res) => {
  console.log(req.body);
  // 등록은 Map(db)에 저장(put) 해줘야한다.
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).channelTitle}  님, 유튜버 생활을 응원합니다.`,
  });
});
