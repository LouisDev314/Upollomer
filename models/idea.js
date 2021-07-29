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
    status: {
        type: String,
        required: true
    },
    // files will be stored in file system
    coverImageName: {
        type: String
    },
    devLogName: {
        type: String
    },
    coDreamer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // this is the module exports from user model
    }
});

module.exports = mongoose.model('Idea', ideaSchema);