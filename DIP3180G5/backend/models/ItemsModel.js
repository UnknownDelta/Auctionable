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
    colour:{
        type: String,
        required: true
    },
    fuel_type:{
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
    years_used:{
        type: Number,
        required: true
    },
    registration_date:{
        type:String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    new_used:{
        type: Boolean,
        required: true
    },
    images:{
        type: [String],
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Items', itemSchema)