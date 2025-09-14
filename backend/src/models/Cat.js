const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  color: { type: String, required: true, trim: true },
  favoriteGames: {type: String },
  specialty: {type: String },
  likes: { type: String },
  photoUrl: { type: String }
});

module.exports = mongoose.model('Cat', catSchema);
