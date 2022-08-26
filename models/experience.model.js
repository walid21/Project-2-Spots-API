const { Schema, model } = require("mongoose");

const experienceSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  location: {
    type: Schema.Types.String,
  },
  theme: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  activity: {
    type: Schema.Types.String,
  },
  picture: {
    type: Schema.Types.String,
  },
  userId: {
    type: Schema.Types.String, // TODO: change to ObjectID + reference
  },
});

const Experience = model("Experience", experienceSchema);

module.exports = Experience;
