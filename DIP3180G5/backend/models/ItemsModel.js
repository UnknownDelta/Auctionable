const mongoose = require('mongoose')

const Schema= mongoose.Schema

const itemSchema = new Schema({
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    registration_date:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: true
    },
    seller_id:{
        type: String,
        required: true
    },
    seller_name:{
        type: String,
        required: true
    },
    seller_image:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        required: true
    },
    cart:{
        type: [String],
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Items', itemSchema)