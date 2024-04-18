const request = require("supertest");
const { app, server, sum } = require("../src/index.js");

afterAll(() => {
  server.close();
});

describe("Simple Test", () => {
  it("should return Hello World!", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});