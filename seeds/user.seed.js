const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
require("../db/index");
const passwordHashed = bcrypt.hashSync("testtestehein", 10);
const passwordHashed2 = bcrypt.hashSync("testtestehein", 10);
const users = [
  {
    username: "testeur",
    email: "test@test.com",
    password: passwordHashed,
    pictures: [],
    favorites: [],
  },
  {
    username: "benlapiche",
    email: "mangemoilapiche@mail.com",
    password: passwordHashed2,
    favorites: [],
    pictures: [],
  },
];

async function dbLaunch() {
  await User.deleteMany();
  const createdUser = await User.create(users);
  console.log("created user", createdUser);
  mongoose.disconnect();
}

dbLaunch();
