// Load environment variables from the .env file
require('dotenv').config();
// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

// Create the Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Custom logging middleware (for debugging)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Middleware to strip stage name from the request path
app.use((req, res, next) => {
    // Strip out the stage from the path
    if (req.path.indexOf('/dev/') === 0) {
        req.url = req.url.replace('/dev', '');
    }
    next();
});

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Define routes and route handling
        const carRoutes = require('./routes/lists');
        app.use('/api/cars', carRoutes);
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

// Export the serverless handler
module.exports.handler = serverless(app);
