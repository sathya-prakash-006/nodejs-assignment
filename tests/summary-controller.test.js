const request = require("supertest");

const endPointUrl = "/api/all/summary/";
const app = require("../src/index");
const mockData = require("./mockData/mockData.json");

// Get all summary
describe("/api/all/summary/", () => {
  it("GET" + endPointUrl, async () => {
    const response = await request(app).get("/api/all/summary/");
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.type).toBe("application/json");
  });
});

// craete summary
describe("summary", () => {
  it("POST summary", async () => {
    const response = await request(app).post("/api/summary/").send(mockData);
    expect(typeof response.body).toBe("object");
    expect(response.type).toBe("application/json");
  });
});
