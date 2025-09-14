const reservationService = require('../services/ReservationService');

class ReservationController {
  
  async createReservation(req, res, next) {
    try {
            const reservationData = { ...req.body, userId: req.user.id };
      const reservation = await reservationService.createReservation(reservationData);
      res
        .status(201)
        .json({ message: 'Reservation booked successfully', reservation });
    } catch (error) {
      if (error.message === 'Reservation already confirmed') {
        res
          .status(409)
          .json({ message: 'A reservation already exists for this date and time' });
      } else {
        next(error);
      }
    }
  }

  async getReservationById(req, res, next) {
    try {
      const reservation = await reservationService.getReservationById(req.params.id);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }

  async getReservationsByUser(req, res, next) {
    try {
      const reservations = await reservationService.getReservationsByUser(req.params.userId);
      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }

    async getAllReservations(req, res, next) {
    try {
      let reservations;
      if (req.user && req.user.role === 'admin') {
        reservations = await reservationService.getAllReservations();
      } else {
        reservations = await reservationService.getReservationsByUser(req.user.id);
      }
      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }

  async updateReservation(req, res, next) {
    try {
      const reservation = await reservationService.updateReservation(req.params.id, req.body);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }

  async deleteReservation(req, res, next) {
    try {
      const reservation = await reservationService.deleteReservation(req.params.id);
      res.json(reservation);
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new ReservationController();
