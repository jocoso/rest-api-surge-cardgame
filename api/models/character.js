const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  weaponTypeId: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  quote: { type: String, required: true },
  factionId: { type: Number, required: true },
  story: { type: String, default: "" },
  stats: {
    swp: { type: Number, required: true },
    shp: { type: Number, required: true },
    effectName: { type: String, default: "" },
    effectDesc: { type: String, default: "" }
  }
});

module.exports = mongoose.model("Character", characterSchema);
