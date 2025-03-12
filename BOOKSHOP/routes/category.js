const express = require("express");
const {allCategory} = require("../controller/categoryController");
const router = express.Router();

router.use(express.json());
//(카테고리별)전체 도서 조회
router.get("/", allCategory);


module.exports = router;