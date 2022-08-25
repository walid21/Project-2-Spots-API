const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const spotSchema = new Schema({
  name: {
    type: Schema.Types.String,
    // unique: true -> Ideally, should be unique, but its up to you
  },
  location: {
    type: Schema.Types.String,
  },
  theme: {
    type: Schema.Types.String,
  },
  activity: {
    type: Schema.Types.String,
  },
  topography: {
    type: Schema.Types.String,
  },
});

const Spot = model("Spot", spotSchema);

module.exports = Spot;
