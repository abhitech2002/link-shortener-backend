const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/url', urlRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Connect to DB and start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`URL Shortener app listening on port ${process.env.PORT}`);
            });
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err);
            process.exit(1);
        });
}

module.exports = app; // Export app for testing
