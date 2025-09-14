const reservationDao = require('../daos/ReservationDao');
const ReservationDTO = require('../dtos/ReservationDto');

class ReservationService {
  async createReservation(reservationData) {
    const existing = await reservationDao.findConfirmedReservation(
      reservationData.date,
      reservationData.time
    );
    if (existing) {
      throw new Error('Reservation already confirmed');
    }

    const reservation = await reservationDao.createReservation(reservationData);
    return new ReservationDTO(reservation);
  }

  async getReservationById(id) {
    const reservation = await reservationDao.getReservationById(id);
    if (!reservation) throw new Error('Reservation not found');
    return new ReservationDTO(reservation);
  }

  async getReservationsByUser(userId) {
    const reservations = await reservationDao.getReservationsByUser(userId);
    return reservations.map(res => new ReservationDTO(res));
  }

  async updateReservation(id, updateData) {
    const reservation = await reservationDao.updateReservation(id, updateData);
    if (!reservation) throw new Error('Reservation not found');
    return new ReservationDTO(reservation);
  }

  async deleteReservation(id) {
    const reservation = await reservationDao.deleteReservation(id);
    if (!reservation) throw new Error('Reservation not found');
    return new ReservationDTO(reservation);
  }
}

module.exports = new ReservationService();
