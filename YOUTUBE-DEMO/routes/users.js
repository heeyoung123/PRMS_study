const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json());

//로그인
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, function (err, results) {
    let loginUser = results[0];

    if (loginUser && loginUser.password == password) {
      res.status(200).json({
        msg: `${loginUser.name}님 로그인 되었습니다.`,
      });
    } else {
      res.status(400).json({
        msg: "이메일, 비번 중 뭔가 틀렸음",
      });
    }
  });
});

//회원가입
router.post("/join", function (req, res) {
  if (req.body == {}) {
    res.status(400).json({
      msg: "입력",
    });
  } else {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email,name,password,contact) VALUES (?,?,?,?)`;
    let values = [email, name, password, contact];
    conn.query(sql, values, function (err, results, fields) {
      res.status(201).json(results);
    });
  }
});

router
  .route("/users")
  .get((req, res) => {
    let { email } = req.body;
    let sql = `SELECT * FROM users Where email=?`;
    conn.query(sql, email, function (err, results, fields) {
      if (results.length) res.status(200).json(results);
      else {
        res.status(400).json({
          msg: "다시",
        });
      }
    });
  })
  .delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE  FROM users WHERE email=?`;
    conn.query(sql, email, function (err, results, fields) {
      res.status(200).json(results);
    });
  });

module.exports = router;
