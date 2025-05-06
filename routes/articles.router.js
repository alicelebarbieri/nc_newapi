const express = require("express");
const { getAllArticles, getArticleById } = require("../controllers/articles.controller");

const articlesRouter = express.Router();

articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', getArticleById);

module.exports = articlesRouter;
