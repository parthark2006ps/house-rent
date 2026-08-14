const mongoose = require('mongoose');

const seedDB = require('./seedDB');

let isConnectedToMongo = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/househunt_tn', {
      serverSelectionTimeoutMS: 3000 // quick timeout check
    });
    isConnectedToMongo = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDB();
  } catch (error) {
    console.warn(`MongoDB Connection Notice: Local MongoDB service not detected (${error.message}).`);
    console.log(`Fallback Mode Active: Operating with high-performance in-memory state engine for instant zero-config experience.`);
    isConnectedToMongo = false;
  }
};

const getMongoStatus = () => isConnectedToMongo;

module.exports = { connectDB, getMongoStatus };
