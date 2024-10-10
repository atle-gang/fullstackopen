const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

require("dotenv").config();
mongoose.set('strictQuery', false);

const mongoUrl = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.blicn.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl)
 .then(result => {
    console.log("Connected to MongoDB")
 })
 .catch((error) => {
    "Error connecting to MongoDB", error.message
});

app.use(cors());
app.use(express.json());

app.get('/info', (request, response) => {
    response.send('<h1>Blog List App</h1>');
});

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});