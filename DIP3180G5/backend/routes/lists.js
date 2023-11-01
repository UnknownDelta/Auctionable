
const express = require('express')
const router = express.Router();
// Import your car controller
const carController = require('../controllers/itemController')
const userController = require('../controllers/userController')
const auctionCarController = require('../controllers/auctionController')
const transactionController = require('../controllers/transactionController')
// Define routes for getting all cars, etc
router.get('/', carController.getAllCars);
router.get('/auctions', auctionCarController.getAllAuctionCars) // changed 
router.get('/:seller/list', carController.getItems)
router.get('/:seller/auctions', auctionCarController.getAuctionItems) // changed
router.get('/:seller/pastlist', carController.getSoldItems)
router.get('/:seller/pastauction', auctionCarController.getAuctionSoldItems) // changed 
router.post('/createlist', carController.createItem)
router.post('/createauction', auctionCarController.createAuction)  // changed
router.patch('/updatelist/:id', carController.updateItem)
router.post('/createuser', userController.createUser)
router.get('/user/:id', userController.getUser)
router.get('/:id/auction', auctionCarController.getAuction) // changed, get a single auction car
router.post('/createtransaction', transactionController.createTransaction) // changed
router.get('/:item_id/transaction', transactionController.getTransaction) // changed, everyone's transactions for a specific auction car (use in leaderboard)

module.exports = router;

