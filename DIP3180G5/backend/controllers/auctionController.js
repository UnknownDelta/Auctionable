// const { json } = require('express')
const Auction = require("../models/AuctionModel")
const mongoose = require('mongoose')
const { Transaction } = require('mongodb')

const auctionCarController = {
    getAllAuctionCars: async (req, res) => {
        try {
            const auctionCars = await Auction.find({}).sort({createdAt: -1}); // Use the Auction model to retrieve all auction cars
            res.status(200).json(auctionCars)
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Server error' });
        }
    },
    getAuction: async(req, res) =>{
        const {id} = req.params
        const auctionList = await Auction.find({_id : id}).sort({createdAt:-1})
    
        res.status(200).json(auctionList)
    },
    createAuction: async (req, res) =>{
        const {brand, model, buyout_price, starting_bid, reserve_price, ending_time, description, registration_date, images, seller_id, seller_name, seller_image, sold, highestBidder} = req.body
        try {
            const auctionList = await Auction.create({brand, model, buyout_price, starting_bid, reserve_price, ending_time, description, registration_date, images, seller_id, seller_name, seller_image, sold, highestBidder})
            res.status(200).json(auctionList)
            console.log(JSON.stringify(auctionList));
        } catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
        }
    },
    getAuctionItems: async(req, res) =>{
        const {seller} = req.params
        const auctionList = await Auction.find({seller : seller}).sort({createdAt:-1})
        res.status(200).json(auctionList)
    },
    getAuctionSoldItems: async(req, res) =>{
        const {seller} = req.params
        const soldItems = await Auction.find({seller: seller, sold: true}).sort({createdAt:-1})
    
        if (!soldItems) {
            return res.status(400).json({error: 'No previous items'})
        }
        res.status(200).json(soldItems)
    },
    updateAuctionItem: async(req, res) =>{
        const {id} = req.params
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such id'})
        }
        const auctionList = await Items.findOneAndUpdate({_id: id},{
            ...req.body
        })
        if (!auctionList) {
            return res.status(400).json({error: 'No previous items'})
        }
        res.status(200).json(auctionList)
    }
}

module.exports = auctionCarController;