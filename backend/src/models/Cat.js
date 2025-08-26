const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
  photoUrl: String,
});

module.exports = mongoose.model('Cat', catSchema);