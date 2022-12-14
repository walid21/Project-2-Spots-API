const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minLength: 6,
  },
  // picture: {
  //   type: Schema.Types.String,
  // },
  // bio: {
  //   type: Schema.Types.String,
  //   max: 500,
  // },
});

const User = model("User", userSchema);

module.exports = User;
