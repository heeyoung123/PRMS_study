const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();
let id = 1;

router
  .route("/")
  .get((req, res) => {
    if (db.size) {
      let { userId } = req.body;
      let channels = [];
      if (userId) {
        db.forEach(function (value, key) {
          if (value.userId === userId) channels.push(value);
        });

        if (channels.length) {
          res.status(200).json(channels);
        } else {
          res.status(404).json({
            msg: "조회할 채널이 없습니다.",
          });
        }
      } else {
        res.status(404).json({
          msg: "로그인이 필요한 페이지입니다.",
        });
      }
    } else {
      res.status(404).json({
        msg: "조회할 채널이 없습니다.",
      });
    }
  })

  .post((req, res) => {
    if (req.body.channelTitle) {
      let channel = req.body;
      db.set(id++, channel);
      res.status(201).json({ msg: `${db.get(id - 1).channelTitle} 님 홧팅` });
    } else {
      res.status(400).json({
        msg: "요청 값을 제대로 보내주세요.",
      });
    }
  });
router
  .route("/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    if (channel) {
      res.status(200).json(db.get(id));
    } else {
      res.status(404).json({
        msg: "채널 정보를 찾을 수 없습니다.",
      });
    }
  })
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    const channelTitle = channel.channelTitle;
    if (channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);
      res.status(200).json({
        msg: `${channelTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`,
      });
    } else {
      res.status(404).json({
        msg: "채널명이 변경되지 않았습니다.",
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let channel = db.get(id);
    const channelTitle = channel.channelTitle;
    if (channel) {
      db.delete(id);
      res.status(200).json({
        msg: `${channelTitle}님, 우리 인연은 여기까지`,
      });
    } else {
      res.status(404).json({
        msg: `요청하신 ${id}번은 없는 유튜버입니다.`,
      });
    }
  });
module.exports = router;
