const { test, after, beforeEach } = require("node:test");
const { only } = require("node:test");
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

test.only("verifies that the unique identifier properly of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert.ok(blog.id);
  });
});

test.only("verify that making an HTTP POST request successfully creates a new blog post", async () => {
  const testBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "test/url",
    likes: 0
  };

  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  blogsAtEnd = await testHelper.blogsInDB();
  assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogList.length + 1);

  const response = await api.get("/api/blogs");
  const titles = response.body.map(blog => blog.title);
  assert(titles.includes("Test Blog"));
});

test.only("likes property gets added if not included in request body", async () => {
  const blogWithNoLikes = {
    title: "Test With no Likes",
    author: "Test No Likes",
    url: "test/no/likes"
  }

  const response = await api
   .post("/api/blogs")
   .send(blogWithNoLikes)
   .expect(201)
   .expect("Content-Type", /application\/json/)
  
  assert.strictEqual(response.body.likes, 0);
  
})

after(async () => {
  await mongoose.connection.close();
});