const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("PATCH /api/comments/:comment_id", () => {
  test("200: increments votes and returns updated comment", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: 1,
          votes: expect.any(Number)
        });
      });
  });

    test("200: decrements votes and returns updated comment", () => {
    return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -1 })
        .expect(200)
        .then(({ body }) => {
        expect(body.comment).toMatchObject({
            comment_id: 1,
            votes: 15,
            body: expect.any(String),
            author: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(String)
            });
        });
    });

  test("400: invalid comment_id", () => {
    return request(app)
      .patch("/api/comments/not-a-number")
      .send({ inc_votes: 1 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400: invalid inc_votes type", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: "wrong" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("404: comment_id does not exist", () => {
    return request(app)
      .patch("/api/comments/9999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });
});