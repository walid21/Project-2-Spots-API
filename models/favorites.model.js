const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experience: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
  },
});

const Favorite = model("Favorite", favoriteSchema);

module.exports = Favorite;
