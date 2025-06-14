const express = require("express");
const { getCommentsByArticleId, 
        removeCommentById,
        patchCommentById
    } = require("../controllers/comments.controller");
const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByArticleId);
router.delete("/:comment_id", removeCommentById);
router.patch("/:comment_id", patchCommentById);

module.exports = router;
