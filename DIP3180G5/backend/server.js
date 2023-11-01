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

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const carRoutes = require('./routes/cars');
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
