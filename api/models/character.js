const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  imgUrl: String,
  quote: String,
  factionId: Number,
  story: String,
  infoId: Number
});

module.exports = mongoose.model("Character", characterSchema);
