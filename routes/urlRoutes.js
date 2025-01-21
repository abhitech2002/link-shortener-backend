const express = require('express');
const {ShortenUrl} = require('../controllers/urlController')
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/shorten', authenticate, ShortenUrl);

module.exports = router;
