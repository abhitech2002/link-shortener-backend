const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.listen(process.env.PORT, () => {    
    console.log(`URL Shortner app listening on port ${process.env.PORT}`);
});