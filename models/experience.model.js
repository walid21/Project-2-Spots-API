const { Schema, model } = require("mongoose");

const experienceSchema = new Schema({
  name: {
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
  spotId: {
    type: Schema.Types.ObjectId,
    ref: "Spot",
  },
});

const Experience = model("Experience", experienceSchema);

module.exports = Experience;
