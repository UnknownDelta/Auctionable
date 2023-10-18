const express = require('express');
const router = express.Router();
// Import your car controller
const carController = require('../controllers/carController');


// Define routes for getting all cars, searching for cars, and filtering/sorting
router.get('/', carController.getAllCars);
router.get('/search', carController.searchCars); // currently searching is based on car data that is fetched to frontend already
router.get('/filter', carController.filterCars); 
router.post('/', carController.createNewCarListing);

module.exports = router;