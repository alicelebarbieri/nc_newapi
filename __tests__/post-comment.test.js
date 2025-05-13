const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("POST /api/articles/:article_id/comments", () => {
  it("201: returns the posted comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "This is a test comment",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: expect.any(Number),
          body: "This is a test comment",
          votes: 0,
          author: "butter_bridge",
          article_id: 1,
          created_at: expect.any(String),
        });
      });
  });

  it("400: responds with error for missing body", () => {
    const badComment = { username: "butter_bridge" };

    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  it("400: responds with error for missing username", () => {
    const badComment = { body: "Missing username" };

    return request(app)
      .post("/api/articles/1/comments")
      .send(badComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  it("404: article not found", () => {
    const comment = {
      username: "butter_bridge",
      body: "Should fail on invalid article",
    };

    return request(app)
      .post("/api/articles/9999/comments")
      .send(comment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article or user not found");
      });
  });

  it("400: invalid article_id", () => {
    const comment = {
      username: "butter_bridge",
      body: "Should fail on invalid article_id",
    };

    return request(app)
      .post("/api/articles/notanid/comments")
      .send(comment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
