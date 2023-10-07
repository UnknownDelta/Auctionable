const mongoose = require('mongoose');
const Car = require('../models/Car'); 
const carController = {
  // Controller for getting all cars
  getAllCars: async (req, res) => {
    try {
      // res.json({mssg: 'GET all cars'})
      const cars = await Car.find({}).sort({createdAt: -1}); // Use the Car model to retrieve all cars
      res.status(200).json(cars)
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Server error' });
    }
  },

  // Controller for searching cars
  searchCars: async (req, res) => {
    const { searchTerm } = req.query;
    try {
      res.json({mssg: 'SEARCH all cars'})
      // const cars = await Car.find({ $text: { $search: searchTerm } });
      // res.json(cars);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Server error' });
    }
  },

  // Controller for filtering/sorting cars
  filterCars: async (req, res) => {
    const { filterCriteria } = req.query;
    try {
      res.json({mssg: 'FILTER all cars'})
      // const cars = await Car.find(filterCriteria).sort({ /* specify sort criteria here */ });
      // res.json(cars);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Server error' });
    }
  },

  createNewCarListing: async (req, res) => {
    const {
      brand,
      model,
      bodyType,
      seats,
      price,
      mileage,
      yearsOfCOELeft,
      registrationDate,
      usedOrNew,
      pastOwners,
      colour,
      fuelType,
      transmission,
      availability,
      seller,
      imageURLs
    } = req.body;
    try {
      const car = await Car.create({
        brand,
        model,
        bodyType,
        seats,
        price,
        mileage,
        yearsOfCOELeft,
        registrationDate,
        usedOrNew,
        pastOwners,
        colour,
        fuelType,
        transmission,
        availability,
        seller,
        imageURLs})
        res.status(200).json(car);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = carController;