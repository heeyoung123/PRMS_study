const { channel } = require("diagnostics_channel");
const express = require("express");
const app = express();

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

app.get("/:nickname", (req, res) => {
  const { nickname } = req.params;
  if (nickname == "@15ya.fullmoon") {
    res.json(youtuber1);
  } else if (nickname == "@TEO_universe") {
    res.json(youtuber2);
  } else {
    res.json({ message: "몰라 이런 유튜버" });
  }
});
app.listen(1234);
