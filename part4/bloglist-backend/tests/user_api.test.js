const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("./test_helper");
const bcrypt = require('bcrypt');

let dwightToken;
let michaelToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create users
  await api.post("/api/users").send(testHelper.testUsers[0]);
  await api.post("/api/users").send(testHelper.testUsers[1]);

  // Get tokens
  const dwightLogin = await api.post("/api/login").send(testHelper.testUsers[0]);
  const michaelLogin = await api.post("/api/login").send(testHelper.testUsers[1]);
  dwightToken = `bearer ${dwightLogin.body.token}`;
  michaelToken = `bearer ${michaelLogin.body.token}`;

  // Create blogs for users
  const dwightBlogs = testHelper.dwightBlogs;
  await api.post("/api/blogs").send(testHelper.dwightBlogs[0]).set("Authorization", dwightToken);
  await api.post("/api/blogs").send(testHelper.dwightBlogs[1]).set("Authorization", dwightToken);
  await api.post("/api/blogs").send(testHelper.dwightBlogs[2]).set("Authorization", dwightToken);

  const michaelBlogs = testHelper.michaelBlogs;
  await api.post("/api/blogs").send(testHelper.michaelBlogs[0]).set("Authorization", michaelToken);
  await api.post("/api/blogs").send(testHelper.michaelBlogs[1]).set("Authorization", michaelToken);
  await api.post("/api/blogs").send(testHelper.michaelBlogs[2]).set("Authorization", michaelToken);
});

describe("invalid request to users", () => {
  test("test fails if username is taken", async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: testHelper.testUsers[0].username,
      name: "Mark",
      password: "iammark"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.error, "expected `username` to be unique");
    const usersAtEnd = await testHelper.usersInDB();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test("test fails if username is too short", async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: "jp",
      name: "Jim Halpert",
      password: "ilovepam"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.error, "username is too short");
    const usersAtEnd = await testHelper.usersInDB();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test("test fails if username is too short", async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: "kevmalone",
      name: "Kevin Malone",
      password: "km"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.error, "password is too short");
    const usersAtEnd = await testHelper.usersInDB();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

describe("valid request to users", () => {
  test("user is able to create user that meets requirements", async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: "angie",
      name: "Angela Lipton",
      password: "dwight<3"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.usersInDB();
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});