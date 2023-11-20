
const express = require('express')
const router = express.Router();
// Import your car controller
const carController = require('../controllers/carController')
const userController = require('../controllers/userController')
const auctionCarController = require('../controllers/auctionController')
const transactionController = require('../controllers/transactionController')

// car controller
router.get('/', carController.getAllCars);
router.get('/id=:id', carController.getCarDetails);
router.get('/:seller/list', carController.getItems)
router.get('/:seller/pastlist', carController.getSoldItems)
router.get('/:buyer/cart', carController.getCartItems)
router.post('/createlist', carController.createItem)
router.patch('/updatelist/id=:id', carController.updateItem)

// user controller
router.get('/user/id=:id', userController.getUser)
router.post('/createuser', userController.createUser)

// auction controller
router.get('/auctions', auctionCarController.getAllAuctionCars)
router.get('/auctions/id=:id', auctionCarController.getAuction) // get a single auction car
router.post('/createauction', auctionCarController.createAuction)
router.get('/auctions/seller=:seller', auctionCarController.getAuctionItems) // get a list of auction cars posted by a specific seller
router.get('/pastauctions/seller=:seller', auctionCarController.getAuctionSoldItems) // get a list of sold auctions cars by a specific seller
router.patch('/updateauction/id=:id', auctionCarController.updateAuctionItem) // this is to update the current highest bidder

// transaction controller
router.post('/createtransaction', transactionController.createTransaction) // changed
router.get('/:item_id/transaction', transactionController.getTransaction) // changed, everyone's transactions for a specific auction car (use in leaderboard)

module.exports = router;
