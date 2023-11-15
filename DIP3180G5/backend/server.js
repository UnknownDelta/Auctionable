require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
let server; // Variable to hold the server instance

const startServer = () => {
    const app = express();
    const port = process.env.PORT;

    app.use(express.json());

    app.use((req, res, next) => {
        console.log(req.path, req.method);
        next();
    });

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            const carRoutes = require('./routes/lists');
            app.use('/api/cars', carRoutes);

            server = app.listen(port, () => {
                console.log('Connected to the database and listening on port', port);
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

const stopServer = () => {
    if (server) {
        server.close((err) => {
            if (err) {
                console.error('Error closing the server:', err);
            }
        });
    }
};

if (require.main === module) {
    startServer();
}

module.exports = { startServer, stopServer };
