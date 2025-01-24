const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async (isTest = false) => {
  const uri = isTest ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected (${isTest ? 'Test' : 'Production'})`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
