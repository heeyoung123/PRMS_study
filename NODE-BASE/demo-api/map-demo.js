const express = require("express");
const app = express();
app.listen(1231);
app.get("/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  res.json(db.get(id));
  if (db.get(id) == undefined) {
    res.send("실패!");
  } else {
    product = db.get(id);
    product.id = id;
    res.json(product);
  }
});

let db = new Map();
// db.set(키, 벨류) 키로 벨류를 찾을 수 있는 한 쌍을 저장한다

let notebook = {
  productName: "Notebook",
  price: 20000,
};
let cup = {
  productName: "Cup",
  price: 2500,
};
let chair = {
  productName: "Chair",
  price: 43000,
};

db.set(1, notebook);
db.set(2, cup);
db.set(3, chair);

console.log(db);
console.log(db.get(1));
