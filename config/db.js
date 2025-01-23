const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (isTest = false) => {
  const uri = isTest ? `${process.env.MONGO_URI}-test` : process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(uri);

    console.log(
      `MongoDB connected (${isTest ? "Test" : "Production"}): ${
        conn.connection.host
      }`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
