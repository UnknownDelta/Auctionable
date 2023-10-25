const { json } = require('express')
const Auction = require("../models/AuctionModel")
const mongoose = require('mongoose')
const { Transaction } = require('mongodb')

const getAuction = async(req, res) =>{
    const {id} = req.params
    const auctionList = await Auction.find({_id : id}).sort({createdAt:-1})

    res.status(200).json(auctionList)
}

const createAuction = (async (req, res) =>{
    const {brand, model, colour, fuel_type, mileage, buyout_price, starting_bid, ending_time, description, years_used, registration_date, category, new_used, images, seller, sold} = req.body

    try {
        const auctionList = await Auction.create({brand, model, colour, fuel_type, mileage, buyout_price, starting_bid, ending_time, description, years_used, registration_date, category, new_used, images, seller, sold})
        res.status(200).json(auctionList)
        console.log(json(auctionList))
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)
    }
})

module.exports = {
    getAuction,
    createAuction
}