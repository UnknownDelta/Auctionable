const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const { startServer, stopServer } = require('../server');
const request = require('supertest');
const router = require('../routes/lists');

const app = express();
app.use('/api/cars', router);



describe('Routes', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_URI + 1, { useNewUrlParser: true, useUnifiedTopology: true });
        startServer();
    });

    afterAll(async () => {
        if (app.listening) { // Checking if the server is running
            await stopServer();
        }
        await mongoose.disconnect();
    });

    it('should test GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        // Add more assertions based on your application's behavior
    });
});
