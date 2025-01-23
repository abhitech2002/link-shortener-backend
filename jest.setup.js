const mongoose = require("mongoose");
const connectDB = require('./config/db');

beforeAll(async () => {
    try {
        await connectDB(true);
        console.log("Connected to the test database");
    } catch (error) {
        console.error("Failed to connect to the test database:", error.message);
        process.exit(1);
    }
});

afterAll(async () => {
    try {
        if (process.env.MONGO_URI.includes("-test")) {
            await mongoose.connection.dropDatabase(); // Clean up the test database
            console.log("Test database cleaned up");
        }
        await mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error during database cleanup:", error.message);
    }
});