const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/info', (request, response) => {
  response.send('<h1>Blog List App</h1>');
});

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
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

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;