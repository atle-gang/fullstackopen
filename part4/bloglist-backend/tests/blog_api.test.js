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

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogListObjects = testHelper.initialBlogList.map(blog => new Blog(blog));
  const promiseArray = blogListObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog list returns correct amount of blog posts", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, testHelper.initialBlogList.length);
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

  test("likes property gets added if not included in request body", async () => {
    const blogWithNoLikes = {
      title: "Test With no Likes",
      author: "Test No Likes",
      url: "test/no/likes"
    };

    const response = await api
      .post("/api/blogs")
      .send(blogWithNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("a valid blog can be added", async () => {
    const invalidBlog = {
      author: "Test No Likes",
      likes: 5
    };

    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .expect(400);

    const notesAtEnd = await testHelper.blogsInDB();

    assert.strictEqual(notesAtEnd.length, testHelper.initialBlogList.length);
  });
});

describe("getting a blog by id", () => {
  test("getting a blog with a specific id", async () => {
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToGet = blogsAtStart[0];

    await api
      .get(`/api/blogs/${blogToGet.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("updating a blog", () => {
  test("updating a blog with a specific id", async () => {
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "Updated title",
      url: "Updated url",
      author: "Updated author",
      likes: 1
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await testHelper.blogsInDB();
    const titles = blogsAtEnd.map(blog => blog.title);
    assert(titles.includes(updatedBlog.title));
  });
});

describe("a blog can be deleted", () => {
  test("deleting a blog", async () => {
    const blogsAtStart = await testHelper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await testHelper.blogsInDB();

    const ids = blogsAtEnd.map(blog => blog.id);
    assert(!ids.includes(blogToDelete.id));

    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogList.length - 1);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with a proper statuscode and message if username already taken', async () => {
    const usersAtStart = await testHelper.usersInDB();

    const newUser = {
      username: 'root',
      name: 'Arnold',
      password: 'illbeback',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close();
});