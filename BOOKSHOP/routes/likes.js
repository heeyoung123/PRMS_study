const express = require("express");
const router = express.Router();
const {addLike, removeLike} = require("../controller/likeController");

router.use(express.json());
//좋아요 추가
router.post("/:id", addLike);
//좋아요 취소
router.delete("/:id", removeLike);


module.exports = router;