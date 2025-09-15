const express = require('express');
const authController = require('../controllers/authcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/register',
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest,
  authController.register
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
  authController.login
);

module.exports = router;
