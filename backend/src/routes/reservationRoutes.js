const express = require('express');
const reservationController = require('../controllers/reservationcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  body('userId').notEmpty().withMessage('User ID is required'),
  body('visitDate').isISO8601().toDate().withMessage('Valid visit date is required'),
  body('numGuests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  validateRequest,
  reservationController.createReservation
);

router.get('/:id', authenticateJWT, reservationController.getReservationById);

router.get('/user/:userId', authenticateJWT, reservationController.getReservationsByUser);

router.put(
  '/:id',
  authenticateJWT,
  body('visitDate').optional().isISO8601().toDate().withMessage('Valid visit date is required'),
  body('numGuests').optional().isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  validateRequest,
  reservationController.updateReservation
);

router.delete('/:id', authenticateJWT, reservationController.deleteReservation);

module.exports = router;