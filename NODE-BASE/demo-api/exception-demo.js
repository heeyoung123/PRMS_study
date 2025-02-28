const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.listen(process.env.PORT);

const members = [
  { id: 1, name: "Kim", age: 22, married: false },
  { id: 2, name: "Lee", age: 28, married: false },
  { id: 3, name: "Park", age: 26, married: false },
  { id: 4, name: "Moon", age: 24, married: true },
];

//전체 조회
app.get("/members", (req, res) => {
  res.json(members);
});
app.get("/members");

//개별 조회
app.get("/members/:id", (req, res) => {
  let id = req.params.id;
  // 방법1)
  //   let member = members[id - 1];

  // 방법2)
  //   var findMember = "";
  //   members.forEach(function (member) {
  //     if (member.id == id) {
  //       findMember = member;
  //     }
  //   });
  //   res.json(findMember);

  //방법3)
  var findMember = members.find((f) => f.id == id);
  members.forEach(function (member) {
    if (findMember) {
      res.json(findMember);
    } else {
      res.status(404).send("전달주신 id로 저장된 멤버가 없습니다.");
    }
  });
});
