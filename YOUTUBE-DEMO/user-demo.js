//express 모듈 셋팅
const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json());
let id = 1;
let db = new Map();

//로그인

app.post("/login", function (req, res) {
  const { userID, password } = req.body;

  let loginUser = {};
  db.forEach(function (user, id) {
    if (user.userID === userID) {
      loginUser = user;
    }
  });

  if (isExist(loginUser)) {
    console.log("같은거 찾았음");
    if (loginUser.password === password) {
      console.log("둘다있따");
    } else {
      console.log("패스워드 틀렸다.");
    }
  } else {
    console.log("둘다 틀렸다");
  }
});
function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}

//회원가입

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
