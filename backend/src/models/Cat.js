const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  breed: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  description: { type: String },
  photoUrl: { type: String }
});

module.exports = mongoose.model('Cat', catSchema);
