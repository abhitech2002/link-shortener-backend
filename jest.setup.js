const connectDB = require("./config/db");
const mongoose = require('mongoose');

beforeAll(async () => {
  await connectDB(true); // Connect to the test database
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clean up test database
  await mongoose.connection.close();
});
