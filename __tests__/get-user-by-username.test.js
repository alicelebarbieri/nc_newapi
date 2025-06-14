const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users/:username", () => {
  test("200: returns the correct user", () => {
    return request(app)
      .get("/api/users/butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body.user).toEqual({
          username: "butter_bridge",
          name: expect.any(String),
          avatar_url: expect.any(String)
        });
      });
  });

  test("404: returns not found if user doesn't exist", () => {
    return request(app)
      .get("/api/users/unknown_user")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
});
