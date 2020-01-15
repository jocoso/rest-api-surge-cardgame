const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  quote: { type: String, required: true },
  factionId: { type: Number, required: true },
  story: String,
  infoId: Number
});

module.exports = mongoose.model("Character", characterSchema);
