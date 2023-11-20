const mongoose = require('mongoose')

const Schema= mongoose.Schema

const auctionSchema = new Schema({
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
    mileage:{
        type:Number,
        required: true
    },
    buyout_price:{
        type:Number,
        required: true
    },
    starting_bid:{
        type: Number,
        required: true
    },
    reserve_price: {
        type: Number,
        required: true
    },
    ending_time:{
        type:String,
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
    highestBidder: {
        type: String, // id of highest bidder
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Auction', auctionSchema)