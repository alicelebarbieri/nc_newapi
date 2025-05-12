const request = require("supertest");
const app     = require("../app");
const db      = require("../db/connection");
const seed    = require("../db/seeds/seed");

beforeEach(() => seed());
afterAll(() => db.end());

describe("GET /api/articles/:article_id/comments", () => {
  it("200: returns comments array with correct props, sorted by date desc", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBeGreaterThan(0);
        for (let i = 1; i < comments.length; i++) {
          expect(
            new Date(comments[i].created_at) <= new Date(comments[i - 1].created_at)
          ).toBe(true);
        }
        comments.forEach((c) => {
          expect(c).toMatchObject({
            comment_id:   expect.any(Number),
            votes:        expect.any(Number),
            created_at:   expect.any(String),
            author:       expect.any(String),
            body:         expect.any(String),
            article_id:   expect.any(Number),
          });
        });
      });
  });

  it("404: article not found", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  it("400: invalid article_id", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
