const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const passwordHashed = bcrypt.hashSync("testtestehein", 10);
const users = [
  {
    username: "testeur",
    email: "test@test.com",
    password: passwordHashed,
    pictures: [],
    favorites: [],
  },
];

async function dbLaunch() {
  const db = require("../db/index");
  await User.deleteMany();
  const createdUser = await User.create(users);
  console.log("created user", createdUser);
  mongoose.disconnect();
}

dbLaunch();
