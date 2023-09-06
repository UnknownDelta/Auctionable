const express = require('express')
//const Items = require('../models/ItemsModel')
const {
    createItem,
    getItems,
    getSoldItems,
    updateItem
} = require('../controllers/itemController')
const listing = express.Router()

listing.get('/list', getItems)

listing.get('/pastlist', getSoldItems)

listing.get('/createlist', (req, res) =>{
    res.json({mssg: 'placeholder page for creating list'})
})

listing.get('/updatelist', (req, res) =>{
    res.json({mssg: 'placeholder page for updating list'})
})

listing.post('/createlist/:id', createItem)

listing.patch('/updatelist/:id', updateItem)

module.exports = listing