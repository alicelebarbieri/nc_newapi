const express = require("express");
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postArticle,
} = require("../controllers/articles.controller");

const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/comments.controller");

const commentsRouter = require("./comments.router");

const router = express.Router();

router.post("/", postArticle);

router.get("/", getAllArticles);
router.get("/:article_id", getArticleById);
router.patch("/:article_id", patchArticleById);
router.get("/:article_id/comments", getCommentsByArticleId);
router.post("/:article_id/comments", postCommentByArticleId);
router.use("/:article_id/comments", commentsRouter);

module.exports = router;