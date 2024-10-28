const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("./test_helper");
const bcrypt = require("bcrypt");
const api = supertest(app);

let dwightToken;
let michaelToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await api.post("/api/users").send(testHelper.testUsers[0]);
  await api.post("/api/users").send(testHelper.testUsers[1]);

  const dwightLogin = await api.post("/api/login").send(testHelper.testUsers[0]);
  const michaelLogin = await api.post("/api/login").send(testHelper.testUsers[1]);
  dwightToken = `bearer ${dwightLogin.body.token}`;
  michaelToken = `bearer ${michaelLogin.body.token}`;

  // const blogListObjects = testHelper.initialBlogList.map(blog => new Blog(blog));
  // const promiseArray = blogListObjects.map(blog => blog.save());
  // await Promise.all(promiseArray);
  const testDwightBlogList = testHelper.dwightBlogs;
  await api.post("/api/blogs").send(testDwightBlogList[0]).set("Authorization", dwightToken);
  await api.post("/api/blogs").send(testDwightBlogList[1]).set("Authorization", dwightToken);
  await api.post("/api/blogs").send(testDwightBlogList[2]).set("Authorization", dwightToken);

  const testMichaelBlogList = testHelper.michaelBlogs;
  await api.post("/api/blogs").send(testMichaelBlogList[0]).set("Authorization", michaelToken);
});

describe("get blogs posted by users", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog list returns correct amount of blog posts", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, (testHelper.dwightBlogs.length + testHelper.michaelBlogs.length));
  });

  test("verifies that the unique identifier properly of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.ok(blog.id);
    });
  });
});


after(async () => {
  await mongoose.connection.close();
});