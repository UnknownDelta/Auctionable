const { json } = require('express')
const Items = require('../models/ItemsModel')
const mongoose = require('mongoose')


const getItems = async(req, res) =>{
    const {seller} = req.params
    const itemList = await Items.find({seller : seller}).sort({createdAt:-1})

    res.status(200).json(itemList)
}

const getSoldItems = async(req, res) =>{
    const {seller} = req.params
    const soldItems = await Items.find({seller: seller, sold: true}).sort({createdAt:-1})

    if (!soldItems) {
        return res.status(400).json({error: 'No previous items'})
    }

    res.status(200).json(soldItems)
}
const createItem = (async (req, res) =>{
    const {brand, model, colour, fuel_type, price, description, years_used, registration_date, category, new_used, images, seller, sold} = req.body

    try {
        const item_list = await Items.create({brand, model, colour, fuel_type, price, description, years_used, registration_date, category, new_used, images, seller, sold})
        res.status(200).json(item_list)
        console.log(json(item_list))
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)
    }
})

const updateItem = async(req, res) =>{
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

module.exports = {
    createItem,
    getItems,
    getSoldItems,
    updateItem
}