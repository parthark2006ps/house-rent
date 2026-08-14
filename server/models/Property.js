const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  _id: { type: String, default: () => 'prop_' + Date.now() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, enum: ['Apartment', 'Villa', 'Independent House', 'PG / Studio'], default: 'Apartment' },
  price: { type: Number, required: true }, // Monthly Rent in INR
  securityDeposit: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  city: { type: String, required: true }, // e.g. Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, etc.
  locality: { type: String, required: true }, // e.g. Anna Nagar, RS Puram, Thillai Nagar, KK Nagar
  address: { type: String, required: true },
  images: [{ type: String }],
  virtualTourUrl: { type: String, default: '' },
  amenities: [{ type: String }], // WiFi, AC, Parking, Gym, Lift, Power Backup, Security, Furnished
  furnishing: { type: String, enum: ['Fully Furnished', 'Semi Furnished', 'Unfurnished'], default: 'Semi Furnished' },
  owner: { type: String, ref: 'User' },
  ownerName: { type: String, default: 'Tamil Nadu Realtor' },
  ownerPhone: { type: String, default: '+91 98765 43210' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
