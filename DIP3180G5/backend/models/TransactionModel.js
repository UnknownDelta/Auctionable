const mongoose = require('mongoose')

const Schema= mongoose.Schema

const transactionSchema = new Schema({
    item_id: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true
    },

    bid_price: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)