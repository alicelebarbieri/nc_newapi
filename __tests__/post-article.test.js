const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("POST /api/articles", () => {
  test("201: creates and returns a new article with default image if not provided", () => {
    const newArticle = {
      author: "butter_bridge",
      title: "My New Article",
      body: "This is the body",
      topic: "mitch"
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(201)
      .then(({ body }) => {
        const article = body.article;
        expect(article).toMatchObject({
          author: "butter_bridge",
          title: "My New Article",
          body: "This is the body",
          topic: "mitch",
          votes: 0,
          comment_count: 0
        });
        expect(article.article_id).toBeDefined();
        expect(article.created_at).toBeDefined();
      });
  });

  test("400: missing required fields", () => {
    const badArticle = { author: "butter_bridge" };
    return request(app)
      .post("/api/articles")
      .send(badArticle)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });
});
