const mongoose = require("mongoose");

const weaponTypeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true }
});

module.exports = mongoose.model("WeaponType", weaponTypeSchema);
