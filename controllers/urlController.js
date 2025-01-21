const url = require('../models/Urls');
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
            const aliasExists = await url.findOne({ alias });
            if (aliasExists) {
                return res.status(422).json({ success: false, message: "Alias already in use. Please choose a different alias." });
            }
        }

        if (expiresAt && !validateDate(expiresAt)) {
            return res.status(422).json({ success: false, message: "Invalid expiresAt format. Please provide a valid date." });
        }

        // Create short URL
        const shortUrl = await url.create({
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

module.exports = {
    ShortenUrl
}