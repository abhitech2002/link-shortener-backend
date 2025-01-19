const mongoose = require('mongoose')
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortid.generate
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    clicks: { 
        type: Number, 
        default: 0 
    },
    alias: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    expiresAt: { 
        type: Date, 
        default: null 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', urlSchema);
