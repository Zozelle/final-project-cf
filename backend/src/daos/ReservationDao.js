const Reservation = require('../models/Reservation');

class ReservationDao {
  // Create a new reservation
  async createReservation(reservationData) {
    const reservation = new Reservation(reservationData);
    return reservation.save();
  }

  // Find reservation by ID
  async getReservationById(id) {
    return Reservation.findById(id).exec();
  }

  // Find all reservations for a specific user
  async getReservationsByUser(userId) {
    return Reservation.find({ userId }).exec();
  }

  // Update reservation by ID with new data
  async updateReservation(id, updateData) {
    return Reservation.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete reservation by ID
  async deleteReservation(id) {
    return Reservation.findByIdAndDelete(id).exec();
  }
}

module.exports = new ReservationDao();
