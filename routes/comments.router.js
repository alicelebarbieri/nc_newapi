const express = require("express");
const { getCommentsByArticleId } = require("../controllers/comments.controller");
const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByArticleId);

module.exports = router;
