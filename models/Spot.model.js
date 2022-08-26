const { Schema, model } = require("mongoose");

const spotSchema = new Schema({
  name: {
    type: Schema.Types.String,
  },
  location: {
    type: Schema.Types.String,
  },
});

const Spot = model("Spot", spotSchema);

module.exports = Spot;
