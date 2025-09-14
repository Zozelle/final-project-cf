const express = require('express');
const reservationController = require('../controllers/reservationcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  body('date').isISO8601().toDate().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('people').isInt({ min: 1 }).withMessage('Number of people must be at least 1'),
  validateRequest,
  reservationController.createReservation
);

router.get('/:id', authenticateJWT, reservationController.getReservationById);

router.get('/user/:userId', authenticateJWT, reservationController.getReservationsByUser);

router.put(
  '/:id',
  authenticateJWT,
  body('date').optional().isISO8601().toDate().withMessage('Valid date is required'),
  body('time').optional().notEmpty().withMessage('Time is required'),
  body('people').optional().isInt({ min: 1 }).withMessage('Number of people must be at least 1'),
  validateRequest,
  reservationController.updateReservation
);

router.delete('/:id', authenticateJWT, reservationController.deleteReservation);

module.exports = router;