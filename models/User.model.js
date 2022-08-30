const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minLength: 6,
  },

  // TODO : we have to modify the user object and put ObjectId of : experienceID and favoritesId
  // BECAUSE :
  pictures: {
    type: [String],
  },

  favorites: {
    type: [String],
  },
});

const User = model("User", userSchema);

module.exports = User;
