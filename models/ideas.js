const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Idea', ideaSchema);