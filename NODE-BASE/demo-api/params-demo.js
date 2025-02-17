const express = require("express");
const app = express();

app.get("/watch", (req, res) => {
  const q = req.query;

  res.json({
    video: q.v,
  });
});
app.listen(1234);
