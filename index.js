const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`URL Shortner app listening on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
});
