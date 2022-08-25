const { Schema, model, SchemaTypes } = require("mongoose");

const pictureSchema = new Schema({
  url: {
    type: Schema.Types.String,
  },
  comment: {
    type: Schema.Types.String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
  },
  spotId: {
    type: Schema.Types.ObjectId,
  },
});

const Picture = model("Picture", pictureSchema);

module.exports = Picture;
