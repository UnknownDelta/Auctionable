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

const {
    getAuction,
    createAuction
} = require('../controllers/auctionController')

const {
    getTransaction,
    createTransaction
} = require('../controllers/transactionController')

const listing = express.Router()

listing.get('/:seller/list', getItems)

listing.get('/:seller/pastlist', getSoldItems)

listing.post('/createlist', createItem)

listing.patch('/updatelist/:id', updateItem)

listing.post('/createuser', createUser)

listing.get('/user/:id', getUser)

listing.post('/createauction', createAuction)

listing.get('/:id/auction', getAuction)

listing.post('/createtransaction', createTransaction)

listing.get('/:item_id/transaction', getTransaction)

module.exports = listing