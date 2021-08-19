const mongoose = require('mongoose');
const path = require('path');

const logoBasePath = 'uploads/ideaLogos';
const devLogBasePath = 'uploads/ideaDevLogs';

const ideaSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    category: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    region: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    // files will be stored in file system
    logoName: {
        type: String
    },
    devLogName: {
        type: String
    },
    coDreamer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    }
});

// create a virtual property
ideaSchema.virtual('logoPath').get(function() {
    // the actual function here is to allow the 'this' reference for the actual idea object that called this property
    if (this.logoName) {
        return path.join('/', logoBasePath, this.logoName);
    }
});

module.exports = mongoose.model('Idea', ideaSchema);
module.exports.logoBasePath = logoBasePath;
module.exports.devLogBasePath = devLogBasePath;