// Load environment variables from the .env file
require('dotenv').config();
// Import required libraries and setup the port
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
// Create the Express app
const app = express();
// Middleware for parsing JSON requests
app.use(express.json());
// Custom logging middleware (for debugging)
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Define routes and route handling
        const carRoutes = require('./routes/cars');
        app.use('/api/cars', carRoutes);
        // Start the server
        app.listen(port, () => {
            console.log('Connected to the database and listening on port', port);
        });
    })
    .catch((error) => {
        console.log(error);
    });