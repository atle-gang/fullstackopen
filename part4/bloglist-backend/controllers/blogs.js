const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/info', (request, response) => {
  response.send('<h1>Blog List App</h1>');
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blogData = request.body;
    if (!blogData.hasOwnProperty("likes")) {
      blogData.likes = 0;
    }
    const blog = new Blog(blogData);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(400);
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author
  } 

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    console.log(updatedBlog, request.params.id);
    response.json(updatedBlog);
  } catch (error) {
    next(error)
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;