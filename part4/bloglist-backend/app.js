const blogsRouter = require('./controllers/blogs')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const morganMiddleware = require('./utils/middleware');
const logger = require('./utils/logger');
const express = require('express');
const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;

mongoose.connect(mongoUrl)
  .then(result => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(morganMiddleware)

app.use('/api/blogs', blogsRouter);

module.exports = app; 