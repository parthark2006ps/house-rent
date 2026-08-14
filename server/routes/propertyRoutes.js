const express = require('express');
const {
  getProperties,
  getPropertyById,
  createProperty,
  approveProperty,
  rejectProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Owner or Admin can create property
router.post('/', protect, authorizeRole('owner', 'admin'), createProperty);

// Admin moderation routes
router.put('/:id/approve', protect, authorizeRole('admin'), approveProperty);
router.put('/:id/reject', protect, authorizeRole('admin'), rejectProperty);

// Owner / Admin delete property
router.delete('/:id', protect, authorizeRole('owner', 'admin'), deleteProperty);

module.exports = router;
