const request = require("supertest");
const app = require("../app");                   
const endpoints = require("../endpoints.json");  

describe("GET /api", () => {
  test("200: returns the full endpoints.json", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});
