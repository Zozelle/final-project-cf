const express = require('express');
const userController = require('../controllers/usercontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new user 
router.post(
  '/',
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest,
  userController.createUser
);

// Get all users 
router.get('/', userController.getAllUsers);

// Get user by ID 
router.get('/:id', userController.getUserById);

// Get user by email 
router.get('/email/search', userController.getUserByEmail);

// Update user by ID 
router.put(
  '/:id',
  authenticateJWT,
  body('username').optional().notEmpty().withMessage('Username cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  validateRequest,
  userController.updateUser
);

// Delete user by ID 
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;