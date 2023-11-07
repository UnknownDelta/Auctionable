const express = require('express');
const mongoose = require('mongoose');
const awsServerlessExpress = require('aws-serverless-express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI) // need change mongo uri in dotenv file
    .then(() => {
        // Define routes and route handling
        const carRoutes = require('./routes/lists'); // changed this from /cars to /lists
        app.use('/api/cars', carRoutes);
    })
    .catch((error) => {
        console.log(error);
    });

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    awsServerlessExpress.proxy(server, event, context);
};
