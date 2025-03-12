const conn = require("../mariadb");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");


const join = (req, res) => {
  const {email, password} = req.body;
  let sql = "INSERT INTO users (email,password,salt) VALUES (?,?,?)";
//회원가입 시 비밀번호를 암호화해서, salt값을 같이 DB에 저장
  const salt = crypto.randomBytes(10).toString("base64");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");
//로그인 . 이메일&비밀번호(날 것) => salt값 꺼내서 비밀번호 암호화 해보고 db비밀번호랑 비교

  let values = [email, hash, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
  const {email, password} = req.body;
  let sql = "SELECT * FROM users WHERE email =?";

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    const hash = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512").toString("base64");
    if (loginUser && loginUser.password == hash) {
      const token = jwt.sign({email: loginUser.email}, process.env.PRIVATE_KEY, {expiresIn: "1h", issuer: "heeyoung"});
      res.cookie("token", token, {httpOnly: true});
      console.log(token);
      res.status(StatusCodes.OK).json(results);
    } else {
      console.log(err);
      return res.status(StatusCodes.UNAUTHORIZED).end();

      //Forbidden(403) 니가 누군지 알지만 접근 권한 없음
      //Unauthorized(401) 니가 누군지 모름 비인증상태다
    }

  });
};

const requestPasswordReset = (req, res) => {
  const {email} = req.body;
  let sql = "SELECT * FROM users WHERE email =?";
  conn.query(sql, email, (err, results) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json({email: email});
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const passwordReset = (req, res) => {
  const {email, password} = req.body;
  let sql = "UPDATE users SET password = ? ,salt=? WHERE email = ?";

  const salt = crypto.randomBytes(10).toString("base64");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("base64");

  let values = [hash, salt, email];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows == 0)
      return res.status(StatusCodes.BAD_REQUEST).end();
    else
      return res.status(StatusCodes.OK).json(results);
  });
};
module.exports = {join, login, requestPasswordReset, passwordReset};