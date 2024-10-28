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


describe("addition of a new blog", () => {
  test("verify that making an HTTP POST request successfully creates a new blog post", async () => {
    const testBlog = {
      title: "That's What She Said - A Compilation of the Best Jokes",
      author: "Michael Scott",
      url: "https://michaelscottjokes.com/",
      likes: 8
    };

    await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Authorization", michaelToken)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    blogsAtEnd = await testHelper.blogsInDB();
    assert.strictEqual(blogsAtEnd.length, (testHelper.michaelBlogs.length + testHelper.dwightBlogs.length + 1));

    const response = await api.get("/api/blogs");
    const titles = response.body.map(blog => blog.title);
    assert(titles.includes("That's What She Said - A Compilation of the Best Jokes"));
  });

  test("likes property gets added if not included in request body", async () => {
    const blogWithNoLikes = {
      title: "he Finer Points of Improv Comedy",
      author: "Michael Scott",
      url: "https://improvgenius.com/"
    };

    const response = await api
      .post("/api/blogs")
      .send(blogWithNoLikes)
      .set("Authorization", michaelToken)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("an invalid blog cannot be added", async () => {
    const invalidBlog = {
      author: "Michael Scott",
    };

    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .set("Authorization", michaelToken)
      .expect(400);

    const notesAtEnd = await testHelper.blogsInDB();

    assert.strictEqual(notesAtEnd.length, (testHelper.michaelBlogs.length + testHelper.dwightBlogs.length));
  });
});

after(async () => {
  await mongoose.connection.close();
});