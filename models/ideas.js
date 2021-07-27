const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    date: {
        type: Date,
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
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    ideaStatus: {
        type: String,
        required: true
    },
    coverImageName: {
        type: String
    },
    devLogName: {
        type: String
    }
});

module.exports = mongoose.model('Idea', ideaSchema);