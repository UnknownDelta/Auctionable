
const express = require('express')
const router = express.Router();
// Import your car controller
const carController = require('../controllers/itemController')
const userController = require('../controllers/userController')
const auctionController = require('../controllers/auctionController')
const transactionController = require('../controllers/transactionController')
// Define routes for getting all cars, etc
router.get('/', carController.getAllCars);
router.get('/auctions', carController.getAllAuctionCars) // need change 
router.get('/:seller/list', carController.getItems)
router.get('/:seller/auctions', carController.getAuctionItems) // need change
router.get('/:seller/pastlist', carController.getSoldItems)
router.get('/:seller/pastauction', carController.getAuctionSoldItems) // need change
router.post('/createlist', carController.createItem)
router.post('/createauction', auctionController.createAuction)
router.patch('/updatelist/:id', carController.updateItem)
router.post('/createuser', userController.createUser)
router.get('/user/:id', userController.getUser)
router.get('/:id/auction', auctionController.getAuction)
router.post('/createtransaction', transactionController.createTransaction)
router.get('/:item_id/transaction', transactionController.getTransaction)

module.exports = router;

