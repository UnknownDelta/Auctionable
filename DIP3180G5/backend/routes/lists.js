const express = require('express')
const router = express.Router();
// Import your car controller
const carController = require('../controllers/itemController')
const userController = require('../controllers/userController')
// Define routes for getting all cars, etc
router.get('/', carController.getAllCars);
router.get('/auctions', carController.getAllAuctionCars) // need change 
router.get('/:seller/list', carController.getItems)
router.get('/:seller/list', carController.getAuctionItems) // need change
router.get('/:seller/pastlist', carController.getSoldItems)
router.get('/:seller/pastlist', carController.getAuctionSoldItems) // need change
router.get('/transactions/:id', carController.getTransactions) // need change, this is for leaderboard page given the auction car id
router.post('/createTransaction', carController.createTransaction) // need change, when one user bids and that specific user bidding info eg userid, bidding price, datetime, itemid 
router.post('/createlist', carController.createItem)
router.post('/createauctionlist', carController.createAuctionItem) // need change
router.patch('/updatelist/:id', carController.updateItem)
router.post('/createuser', userController.createUser)
router.get('/user/:id', userController.getUser)

module.exports = router;





