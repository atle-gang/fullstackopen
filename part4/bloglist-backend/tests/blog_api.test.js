const { test, after, beforeEach } = require("node:test");
const only = require("node:test");
const mongoose = require("mongoose");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const testHelper = require("./test_helper"); 

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogListObjects = testHelper.initialBlogList.map(blog => new Blog(blog));
  const promiseArray = blogListObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test.only("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test.only("blog list returns correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, testHelper.initialBlogList.length);
});

after(async () => {
  await mongoose.connection.close();
});