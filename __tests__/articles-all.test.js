const request = require("supertest");
const app     = require("../app");
const db      = require("../db/connection");
const seed    = require("../db/seeds/seed");
const data    = require("../db/data/test-data");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/articles", () => {
  it("200: returns array of articles with correct properties and no body", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBeGreaterThan(0);
        articles.forEach((a, i) => {
          expect(a).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
          expect(a).not.toHaveProperty("body");
        });
        // check sorted by date desc
        const dates = articles.map((a) => new Date(a.created_at));
        for (let i = 1; i < dates.length; i++) {
          expect(dates[i] <= dates[i - 1]).toBe(true);
        }
      });
  });
});
