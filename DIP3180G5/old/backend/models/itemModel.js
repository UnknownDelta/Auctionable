const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Store the image URL or file path as a string
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)