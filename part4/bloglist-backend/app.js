const blogsRouter = require('./controllers/blogs')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const express = require('express');
const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(result => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    "Error connecting to MongoDB", error.message;
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app; 