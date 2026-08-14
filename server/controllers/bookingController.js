const Booking = require('../models/Booking');
const { getMongoStatus } = require('../config/db');
const { initialBookings } = require('../data/seedData');
const { memoryProperties } = require('./propertyController');

let memoryBookings = [...initialBookings];

// Create new booking inquiry
const createBooking = async (req, res) => {
  try {
    const { propertyId, moveInDate, leaseDurationMonths, message, userPhone } = req.body;

    if (!propertyId || !moveInDate) {
      return res.status(400).json({ message: 'Property ID and Move-In Date are required.' });
    }

    const duration = Number(leaseDurationMonths || 11);
    let propTitle = '';
    let propCity = '';
    let propPrice = 0;

    if (getMongoStatus()) {
      const Property = require('../models/Property');
      const prop = await Property.findById(propertyId);
      if (prop) {
        propTitle = prop.title;
        propCity = prop.city;
        propPrice = prop.price;
      }
    } else {
      const prop = memoryProperties.find(p => p._id === propertyId);
      if (prop) {
        propTitle = prop.title;
        propCity = prop.city;
        propPrice = prop.price;
      }
    }

    const totalPrice = propPrice * duration;

    const bookingData = {
      property: propertyId,
      propertyTitle: propTitle || 'Tamil Nadu Rental Property',
      propertyCity: propCity || 'Chennai',
      propertyPrice: propPrice,
      user: req.user ? req.user.id : 'usr_tenant_001',
      userName: req.user ? req.user.name : 'Priya Sundaram',
      userEmail: req.user ? req.user.email : 'user@househunt.tn',
      userPhone: userPhone || (req.user ? req.user.phone : '+91 97908 99887'),
      moveInDate,
      leaseDurationMonths: duration,
      totalPrice,
      status: 'pending',
      message: message || '',
      createdAt: new Date()
    };

    if (getMongoStatus()) {
      const booking = await Booking.create(bookingData);
      return res.status(201).json(booking);
    } else {
      const memoryBooking = {
        _id: 'book_' + Date.now(),
        ...bookingData
      };
      memoryBookings.unshift(memoryBooking);
      return res.status(201).json(memoryBooking);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User's own bookings
const getMyBookings = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    if (getMongoStatus()) {
      const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
      return res.json(bookings);
    } else {
      const userBookings = memoryBookings.filter(b => b.user === userId || b.userEmail === (req.user ? req.user.email : ''));
      return res.json(userBookings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Owner / All Bookings
const getAllBookings = async (req, res) => {
  try {
    if (getMongoStatus()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(bookings);
    } else {
      return res.json(memoryBookings);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Booking Status (e.g. Accept, Reject, Cancel)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'confirmed', 'rejected', 'cancelled'

    if (!['confirmed', 'rejected', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (getMongoStatus()) {
      const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
      if (!booking) return res.status(404).json({ message: 'Booking inquiry not found' });
      return res.json(booking);
    } else {
      const booking = memoryBookings.find(b => b._id === id);
      if (!booking) return res.status(404).json({ message: 'Booking inquiry not found' });
      booking.status = status;
      return res.json(booking);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  memoryBookings
};
