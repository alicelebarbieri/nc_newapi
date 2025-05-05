const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (articlesData) => {
  if (articlesData.length === 0) {
    return {};
}
const result = {};
articlesData.forEach((article) => {
    result[article.title] = article.article_id;
});

return result;
};

exports.formatComments = (commentsData, articleRef) => {
  return commentsData.map((comment) => {
    const formattedComment = {
      body: comment.body,
      votes: comment.votes,
      author: comment.created_by,
      article_id: articleRef[comment.belongs_to],
      created_at: new Date(comment.created_at),
    };
    return formattedComment;
  });
};