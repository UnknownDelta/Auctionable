// const { json } = require('express') // i dont think need this line here right
const Items = require('../models/ItemsModel')
const mongoose = require('mongoose')

const carController = {
    // Controller for getting all cars
    getAllCars: async (req, res) => {
        try {
            // res.json({mssg: 'GET all cars'})
            const cars = await Items.find({}).sort({createdAt: -1}); // Use the Car model to retrieve all cars
            res.status(200).json(cars)
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Server error' });
        }
    },
    getItems: async(req, res) =>{
        const {seller} = req.params
        console.log(seller);
        const itemList = await Items.find({seller_id : seller, sold: false}).sort({createdAt:-1})
        res.status(200).json(itemList)
    },
    getCarDetails: async(req, res) =>{
        const {id} = req.params
        const cars = await Items.find({_id : id}).sort({createdAt:-1})
        res.status(200).json(cars)
    },
    getSoldItems: async(req, res) =>{
        const {seller} = req.params
        console.log(seller);
        const soldItems = await Items.find({seller_id: seller, sold: true}).sort({createdAt:-1})
    
        if (!soldItems) {
            return res.status(400).json({error: 'No previous items'})
        }
    
        res.status(200).json(soldItems)
    },
    createItem: async (req, res) =>{
        const {brand, model, price, description, registration_date, images, seller_id, seller_name, seller_image, sold} = req.body
    
        try {
            const item_list = await Items.create({brand, model, price, description, registration_date, images, seller_id, seller_name, seller_image, sold})
            console.log("item_list", item_list)
            res.status(200).json(item_list)
            // console.log(json(item_list))
        } catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
        }
    },
    createAuctionItem: async (req, res) =>{ // need change here
        const {brand, model, colour, fuel_type, mileage, price, description, years_used, registration_date, category, new_used, images, seller_id, seller_name, seller_image, sold} = req.body
    
        try {
            const item_list = await Items.create({brand, model, colour, fuel_type, mileage, price, description, years_used, registration_date, category, new_used, images, seller_id, seller_name, seller_image, sold})
            res.status(200).json(item_list)
            // console.log(json(item_list))
        } catch (error) {
            res.status(400).json({error: error.message})
            console.log(error.message)
        }
    },
    updateItem: async(req, res) =>{
        const {id} = req.params
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such id'})
        }
        const item_list = await Items.findOneAndUpdate({_id: id},{
            ...req.body
        })
        if (!item_list) {
            return res.status(400).json({error: 'No previous items'})
        }
        res.status(200).json(item_list)
    }
};

module.exports = carController;


/* module.exports = {
    createItem,
    getItems,
    getSoldItems,
    updateItem
} */