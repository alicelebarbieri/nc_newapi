const express = require("express");
const { getAllArticles, getArticleById } = require("../controllers/articles.controller");
const { getCommentsByArticleId, postCommentByArticleId } = require("../controllers/comments.controller");

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.post("/:article_id/comments", postCommentByArticleId);
module.exports = router;