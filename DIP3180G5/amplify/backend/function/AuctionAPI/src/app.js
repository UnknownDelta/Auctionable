/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mongoose = require('mongoose');
require('dotenv').config();


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
