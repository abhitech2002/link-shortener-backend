const Url = require('../models/Urls');
const validateDate = require('../middlewares/validateDate');
const validateUrl = require('../middlewares/validateUrl');

// Genaret random alias
const generateRandomAlias = () => {
    return Math.random().toString(36).substring(2, 8); // Example random alias generator
};

// Shorten Url
const ShortenUrl = async (req, res) => {
    try {
        const { originalUrl, alias, expiresAt } = req.body;

        // Validate inputs
        if (!originalUrl || !validateUrl(originalUrl)) {
            return res.status(422).json({ success: false, message: "Invalid or missing originalUrl." });
        }

        if (alias) {
            const aliasExists = await Url.findOne({ alias });
            if (aliasExists) {
                return res.status(422).json({ success: false, message: "Alias already in use. Please choose a different alias." });
            }
        }

        if (expiresAt && !validateDate(expiresAt)) {
            return res.status(422).json({ success: false, message: "Invalid expiresAt format. Please provide a valid date." });
        }

        // Create short URL
        const shortUrl = await Url.create({
            originalUrl,
            alias: alias || generateRandomAlias(),
            expiresAt,
            userId: req.user.id
        });

        res.status(201).json({ success: true, message: "Short URL created successfully!", data: shortUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Redirect to original URL
const RedirectUrl = async (req, res) => {
    try {
        const { shortUrl } = req.params;

        // Validate if shortUrl is provided
        if (!shortUrl) {
            return res.status(400).json({ success: false, message: "Short URL parameter is missing." });
        }

        const shortenedUrl = await Url.findOne({ shortUrl: { $regex: `^${shortUrl}$`, $options: "i" } });

        if (!shortenedUrl) {
            console.warn(`Short URL not found: ${shortUrl}`);
            return res.status(404).json({ success: false, message: "Short URL not found." });
        }

        if (shortenedUrl.expiresAt && new Date(shortenedUrl.expiresAt) < new Date()) {
            console.warn(`Expired short URL accessed: ${shortUrl}`);
            return res.status(404).json({ success: false, message: "Short URL has expired." });
        }

        // Increment clicks
        shortenedUrl.clicks += 1;
        await shortenedUrl.save();

        // Prevent circular redirects
        if (shortenedUrl.originalUrl === req.protocol + "://" + req.get("host") + req.originalUrl) {
            return res.status(400).json({ success: false, message: "Circular redirect detected." });
        }

        // console.log("Redirecting to:", shortenedUrl.originalUrl);
        res.redirect(shortenedUrl.originalUrl);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getUserUrls = async (req, res) => {
    try {
        // Validate if user ID exists in the request
        if (!req.user || !req.user.id) {
            return res.status(400).json({ success: false, message: "User ID is missing in the request." });
        }

        // Fetch URLs for the user, with optional sorting by creation date
        const urls = await Url.find({ userId: req.user.id }).sort({ createdAt: -1 });

        // Check if URLs are empty
        if (urls.length === 0) {
            return res.status(404).json({ success: false, message: "No URLs found for this user." });
        }

        // Return URLs with count
        res.status(200).json({
            success: true,
            count: urls.length,
            data: urls,
        });
    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    ShortenUrl,
    RedirectUrl,
    getUserUrls
}