//express 모듈 셋팅
const express = require("express");
const app = express();
app.listen(7777);

let id = 1;
let db = new Map();

//로그인
app.post("/login", function (req, res) {});

//회원가입
app.use(express.json());
app.post("/join", function (req, res) {
  if (req.body) {
    db.set(id++, req.body);
    res.status(200).json({
      msg: `${db.get(id - 1).name}님, 환영합니다.`,
    });
  } else {
    res.status(400).json({
      msg: "요청 값을 제대로 보내주세요.",
    });
  }
});
// //회원 개별 조회
// app.get("/users/:id", );

// //회원 개별 탈퇴
// app.delete("/users/:id", );

app
  .route("/users/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);
    if (user) {
      res.status(200).json({
        msg: `${user.userID}님 안녕하세요.`,
      });
    } else {
      res.status(400).json({
        msg: "다시",
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    const user = db.get(id);
    if (user) {
      db.delete(id);
      res.status(200).json({
        msg: `${user.userID}님. 삭제되셨습니다.`,
      });
    } else {
      res.status(400).json({
        msg: "다시",
      });
    }
  });
