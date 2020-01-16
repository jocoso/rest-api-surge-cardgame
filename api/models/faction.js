const mongoose = require("mongoose");

const factionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model("Faction", factionSchema);
