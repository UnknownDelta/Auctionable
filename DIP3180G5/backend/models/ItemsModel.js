const mongoose = require('mongoose')

const Schema= mongoose.Schema

const itemSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    condition:{
        type: String,
        enum: ['Factory New', 'Good', 'Decent', 'Poor', 'Bad'],
        required: true
    },
    years_used:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        emum:['Car', 'Motorbike', 'Van'],
        required: true
    },
    new_used:{
        type: Boolean,
        required: true
    },
    images:{
        type: Buffer,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    sold:{
        type: Boolean,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Items', itemSchema)
