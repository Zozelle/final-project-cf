const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visitDate: { type: Date, required: true },
  numGuests: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Reservation', reservationSchema);
