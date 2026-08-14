const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB, getMongoStatus } = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Quick stats endpoint for Admin Dashboard
app.get('/api/stats', (req, res) => {
  const { memoryProperties } = require('./controllers/propertyController');
  const { memoryBookings } = require('./controllers/bookingController');
  const { memoryUsers } = require('./controllers/authController');

  res.json({
    totalProperties: memoryProperties.length,
    approvedProperties: memoryProperties.filter(p => p.status === 'approved').length,
    pendingModeration: memoryProperties.filter(p => p.status === 'pending').length,
    totalBookings: memoryBookings.length,
    totalUsers: memoryUsers.length,
    citiesCovered: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli", "Thanjavur", "Erode"]
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'HouseHunt Tamil Nadu House Rent Management System API',
    mongoConnected: getMongoStatus(),
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏡 HouseHunt API Server running on port ${PORT}`);
  console.log(`📍 Specialized in Tamil Nadu House Rentals`);
  console.log(`====================================================`);
});
