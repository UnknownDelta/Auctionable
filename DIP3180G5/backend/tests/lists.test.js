const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const { startServer, stopServer } = require('../server');
const request = require('supertest');
const router = require('../routes/lists');
const db = require('../database');

const app = express();
app.use('/api/cars', router);



describe('Routes', () => {
    beforeAll(async () => {
        await db.connectToDatabase(process.env.MONGO_URI);
        startServer(process.env.PORT_TEST_ROUTES);
    });

    afterAll(async () => {
        if (app.listening) {
            await stopServer(process.env.PORT_TEST_SERVER);
        }
        await db.disconnectFromDatabase();
    });

    it('should test GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        // Add more assertions based on your application's behavior
    });
});
