const express = require("express");
const app = express();
const port = 2222;

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.post("/test", function (req, res) {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
