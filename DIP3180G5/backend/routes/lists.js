const express = require('express')
//const Items = require('../models/ItemsModel')
const {
    createItem,
    getItems,
    getSoldItems,
    updateItem
} = require('../controllers/itemController')

const {
    getUser,
    createUser
} = require('../controllers/userController')

const listing = express.Router()

listing.get('/:seller/list', getItems)

listing.get('/:seller/pastlist', getSoldItems)

listing.post('/createlist', createItem)

listing.patch('/updatelist/:id', updateItem)

listing.post('/createuser', createUser)

listing.get('/user/:id', getUser)

module.exports = listing