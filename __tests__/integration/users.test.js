// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/user");

describe("GET /users", async function() {
  test("Gets a list of all users", async function() {
    const response = await request(app).get("/users");
    const data = response.body.metadata;
    expect(data.num_results).toEqual(5);
    expect(data.results).toHaveLength(5);
    // expect(response.body.users[0]).toHaveProperty("handle");
  });

  // test("Has working search", async function() {
  //   await request(app)
  //     .post("/users")
  //     .set("authorization", `${TEST_DATA.userToken}`)
  //     .send({
  //       _token: TEST_DATA.userToken,
  //       handle: "hooli",
  //       name: "Hooli",
  //     });

  //   await request(app)
  //     .post("/users")
  //     .set("authorization", `${TEST_DATA.userToken}`)
  //     .send({
  //       _token: TEST_DATA.userToken,
  //       handle: "pp",
  //       name: "Pied Piper",
  //     });

  //   const response = await request(app)
  //     .get("/users?search=hooli")
  //     .send({
  //       _token: TEST_DATA.userToken,
  //     });
  //   expect(response.body.users).toHaveLength(1);
  //   expect(response.body.users[0]).toHaveProperty("handle");
  // });
});
