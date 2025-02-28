var jwt = require("jsonwebtoken"); //모듈 불러오기
var dotenv = require("dotenv");

dotenv.config();
var token = jwt.sign({ foo: "bar" }, process.env.privateKey); //토큰 생성 = jwt 서명을 했음

console.log(token);

// 검증
//만약 검증에 성공하면, 페이로드 값을 확인할 수 있다.
var decoded = jwt.verify(token, process.env.privateKey);
