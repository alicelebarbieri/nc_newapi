const express = require("express");
const { getCommentsByArticleId, removeCommentById } = require("../controllers/comments.controller");
const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByArticleId);
router.delete("/:comment_id", removeCommentById);
module.exports = router;
