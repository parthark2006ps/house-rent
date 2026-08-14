const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Any authenticated user can create a booking request
router.post('/', protect, createBooking);

// Tenant gets their own bookings
router.get('/my-bookings', protect, getMyBookings);

// Owner / Admin views all booking inquiries
router.get('/all-bookings', protect, authorizeRole('owner', 'admin'), getAllBookings);

// Owner / Admin / Tenant updates status (accept/reject/cancel)
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
