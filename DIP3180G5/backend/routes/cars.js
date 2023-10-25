const express = require('express');
const router = express.Router();
// Import your car controller
const carController = require('../controllers/carController');


// Define routes for getting all cars, creating cars
router.get('/', carController.getAllCars);
router.post('/', carController.createNewCarListing);

module.exports = router;