const express = require('express');
const {ShortenUrl, RedirectUrl, getUserUrls} = require('../controllers/urlController')
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/shorten', authenticate, ShortenUrl);
router.get('/redirect/:shortUrl', RedirectUrl);
router.get('/user/links', authenticate, getUserUrls);

module.exports = router;
