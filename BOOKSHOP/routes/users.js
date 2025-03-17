const express = require("express");
const router = express.Router();

const {join, login, requestPasswordReset, passwordReset} = require("../controller/userController");

router.use(express.json());
//회원 가입
router.post("/join", join);

//로그인
router.post("/login", login);
//비밀번호 초기화 요청
router.get("/reset", requestPasswordReset);
//비밀번호 초기화
router.put("/reset", passwordReset);

module.exports = router;