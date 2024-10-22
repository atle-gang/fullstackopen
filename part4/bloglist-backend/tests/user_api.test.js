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

beforeEach(async() => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Create users
    await api.post("api/users").send(testHelper.testUsers[0]);
    await api.post("api/users").send(testHelper.testUsers[1]);

    // Get tokens
    const dwightLogin = await api.post("/api/login").send(helper.testUsers[0]);
    const michaelLogin = await api.post("/api/login").send(helper.testUsers[1]);
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
})


after(async () => {
  await mongoose.connection.close();
});