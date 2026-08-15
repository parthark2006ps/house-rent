const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const Property = require('./models/Property');
const Booking = require('./models/Booking');
const { initialUsers, initialProperties, initialBookings } = require('./data/seedData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://parthark2006_db_user:Partha12345@cluster0.wqdpywj.mongodb.net/house_rent_db';

const seedDatabase = async () => {
  console.log('⏳ Connecting to MongoDB for seeding...');
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully.');

    // 1. Seed Users with hashed passwords
    console.log('👤 Seeding Users...');
    const salt = await bcrypt.genSalt(10);
    
    for (const userData of initialUsers) {
      let rawPassword = 'user123';
      if (userData.role === 'admin') rawPassword = 'admin123';
      if (userData.role === 'owner') rawPassword = 'owner123';

      const hashedPassword = await bcrypt.hash(rawPassword, salt);

      await User.findOneAndUpdate(
        { email: userData.email.toLowerCase() },
        {
          _id: userData._id,
          name: userData.name,
          email: userData.email.toLowerCase(),
          password: hashedPassword,
          role: userData.role,
          phone: userData.phone,
          city: userData.city
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`  ✓ Seeded User: ${userData.email} (${userData.role})`);
    }

    // 2. Seed Properties
    console.log('🏠 Seeding Rental Properties...');
    for (const propData of initialProperties) {
      await Property.findOneAndUpdate(
        { _id: propData._id },
        propData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`  ✓ Seeded ${initialProperties.length} Properties`);

    // 3. Seed Bookings
    console.log('📅 Seeding Sample Bookings...');
    for (const bookingData of initialBookings) {
      await Booking.findOneAndUpdate(
        { _id: bookingData._id },
        bookingData,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`  ✓ Seeded ${initialBookings.length} Sample Bookings`);

    console.log('🎉 MongoDB Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
