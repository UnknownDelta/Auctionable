const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const { startServer, stopServer } = require('../server');
const request = require('supertest');
const db = require('../database');

describe('Server Connection', () => {
    beforeAll(async () => {
        await db.connectToDatabase(process.env.MONGO_URI);
        await startServer(process.env.PORT_TEST_SERVER);
    });

    afterAll(async () => {
        await stopServer(process.env.PORT_TEST_SERVER);
        await db.disconnectFromDatabase();
    });
    it('should start the server', async () => {
        // Send a test request to your server to check if it's running
        const response = await request('http://localhost:' + process.env.PORT_TEST_SERVER + '/api/cars').get('/'); // Replace '/' with your route

        // Expect the status to be 200 indicating a successful connection
        expect(response.status).toBe(200);
    });
});
