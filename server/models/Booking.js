const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'book_' + Date.now() },
  property: { type: String, ref: 'Property', required: true },
  propertyTitle: { type: String },
  propertyCity: { type: String },
  propertyPrice: { type: Number },
  user: { type: String, ref: 'User', required: true },
  userName: { type: String },
  userEmail: { type: String },
  userPhone: { type: String },
  moveInDate: { type: String, required: true },
  leaseDurationMonths: { type: Number, default: 11 },
  totalPrice: { type: Number },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'cancelled'], default: 'pending' },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
