const express = require('express');
const reservationController = require('../controllers/reservationcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new reservation
router.post(
  '/',
  authenticateJWT,
  body('userId').notEmpty().withMessage('User ID is required'),
  body('visitDate').isISO8601().toDate().withMessage('Valid visit date is required'),
  body('numGuests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  validateRequest,
  reservationController.createReservation
);

// Get reservation by ID
router.get('/:id', authenticateJWT, reservationController.getReservationById);

// Get all reservations for a specific user
router.get('/user/:userId', authenticateJWT, reservationController.getReservationsByUser);

// Update reservation by ID 
router.put(
  '/:id',
  authenticateJWT,
  body('visitDate').optional().isISO8601().toDate().withMessage('Valid visit date is required'),
  body('numGuests').optional().isInt({ min: 1 }).withMessage('Number of guests must be at least 1'),
  validateRequest,
  reservationController.updateReservation
);

// Delete reservation by ID 
router.delete('/:id', authenticateJWT, reservationController.deleteReservation);

module.exports = router;