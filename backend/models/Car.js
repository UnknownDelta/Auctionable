const mongoose = require('mongoose');

// Define the Car schema
const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  bodyType: String,
  seats: Number,
  price: Number,
  mileage: Number,
  yearsOfCOELeft: Number,
  registrationDate: String,
  usedOrNew: String,
  pastOwners: Number,
  colour: String,
  fuelType: String,
  transmission: String,
  availability: String,
  seller: {
    name: String,
    contact: Number,
  },
  imageURLs: [String], // An array of image URLs
}, { timestamps: true });

// Create the Car model
const Car = mongoose.model('Car', carSchema);
module.exports = Car;