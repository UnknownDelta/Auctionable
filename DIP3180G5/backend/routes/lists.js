const express = require('express')
const router = express.Router();
// Import your car controller
const carController = require('../controllers/itemController')
const userController = require('../controllers/userController')
// Define routes for getting all cars, etc
router.get('/', carController.getAllCars);
router.get('/:seller/list', carController.getItems)
router.get('/:seller/pastlist', carController.getSoldItems)
router.post('/createlist', carController.createItem)
router.patch('/updatelist/:id', carController.updateItem)
router.post('/createuser', userController.createUser)
router.get('/user/:id', userController.getUser)

module.exports = router;





