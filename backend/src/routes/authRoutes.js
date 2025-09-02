const express = require('express');
const authController = require('../controllers/authcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');

const router = express.Router();

//Register new user
router.post(
  '/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest,
  authController.register
);

//Login user
router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
  authController.login
);

module.exports = router;
