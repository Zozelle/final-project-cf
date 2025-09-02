const express = require('express');
const catController = require('../controllers/catcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a new cat 
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  validateRequest,
  catController.createCat
);

// Get all cats 
router.get('/', catController.getAllCats);

// Get cat by ID 
router.get('/:id', catController.getCatById);

// Update cat by ID 
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  validateRequest,
  catController.updateCat
);

// Delete cat by ID 
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), catController.deleteCat);

module.exports = router;