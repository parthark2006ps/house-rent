const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const { initialUsers, initialProperties, initialBookings } = require('../data/seedData');

const seedDB = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial users into MongoDB Atlas...');
      await User.insertMany(initialUsers);
      console.log('✅ Initial users seeded successfully!');
    }

    const propCount = await Property.countDocuments();
    if (propCount === 0) {
      console.log('🌱 Seeding initial properties into MongoDB Atlas...');
      await Property.insertMany(initialProperties);
      console.log('✅ Initial properties seeded successfully!');
    }

    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0) {
      console.log('🌱 Seeding initial bookings into MongoDB Atlas...');
      await Booking.insertMany(initialBookings);
      console.log('✅ Initial bookings seeded successfully!');
    }
  } catch (error) {
    console.error('⚠️ Error auto-seeding MongoDB database:', error.message);
  }
};

module.exports = seedDB;
