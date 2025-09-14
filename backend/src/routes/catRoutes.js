const express = require('express');
const catController = require('../controllers/catcontroller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  validateRequest,
  catController.createCat
);
 
router.get('/', catController.getAllCats);

router.get('/:id', catController.getCatById);
 
router.put(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
  validateRequest,
  catController.updateCat
);
 
router.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  catController.deleteCat
);

module.exports = router;