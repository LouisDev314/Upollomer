const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    category: {
        type: String,
        // required: true
    },
    genre: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String
    },
    country: {
        type: String,
        // required: true
    },
    region: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        // required: true
    },
    // files will be stored in file system
    coverImg: {
        // buffer of the data representing entire image (the base 64 code)
        type: Buffer
    },
    coverImgType: {
        type: String
    },
    devLog: {
        type: Buffer
    },
    devLogType: {
        type: String
    },
    coDreamer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creator'
    }
});

// create a virtual property
ideaSchema.virtual('coverImgPath').get(function() {
    // the actual function here is to allow the 'this' reference for the actual idea object that called this property
    if (this.coverImg && this.coverImgType) {
        // data object in HTML -> take buffer data and type to display image through encoded string
        return `data:${this.coverImgType};charset=utf-8;base64,${this.coverImg.toString('base64')}`;
    }
});

ideaSchema.virtual('devLogPath').get(function() {
    if (this.devLog && this.devLogType) {
        return `data:${this.devLogType};charset=utf-8;base-64,${this.devLog.toString('base64')}`;
    }
});

module.exports = mongoose.model('Idea', ideaSchema);