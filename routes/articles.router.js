const express = require("express");
const { getArticleById } = require("../controllers/articles.controller");

const router = express.Router();

router.get("/:article_id", getArticleById);

module.exports = router;