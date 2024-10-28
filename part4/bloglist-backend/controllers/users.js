const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);

    if (user) {
      response.json(user);
    } else {
      response.status(400).end();
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    if (request.body.username.length < 3) {
      response.status(400).json({ error: "username is too short" });
    } else if (request.body.password.length < 3) {
      response.status(400).json({ error: "password is too short" })
    } else {
      const { name, username, password } = request.body;

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();

      response.status(201).json(savedUser);
    }
  } catch (error) {
    response.status(400).json({ error: 'expected `username` to be unique' });
    next(error);
  }
});

usersRouter.delete("/:id", async (request, response) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

