const Reservation = require('../models/Reservation');

class ReservationDao {

    async findConfirmedReservation(date, time) {
    return Reservation.findOne({ date, time, status: 'confirmed' }).exec();
  }

  async createReservation(reservationData) {
    const reservation = new Reservation(reservationData);
    return reservation.save();
  }

  async getReservationById(id) {
    return Reservation.findById(id).exec();
  }

  async getReservationsByUser(userId) {
    return Reservation.find({ userId }).exec();
  }

  async updateReservation(id, updateData) {
    return Reservation.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteReservation(id) {
    return Reservation.findByIdAndDelete(id).exec();
  }
}

module.exports = new ReservationDao();
