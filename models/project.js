const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)