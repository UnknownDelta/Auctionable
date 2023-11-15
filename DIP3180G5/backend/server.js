require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
let server = {};

const startServer = (port) => {
    if (port === undefined)
        port = process.env.PORT;

    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        console.log(req.path, req.method);
        next();
    });

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            const carRoutes = require('./routes/lists');
            app.use('/api/cars', carRoutes);
            console.log("connecting to port " + port);
            server[port] = app.listen(port, () => {
                console.log('Connected to the database and listening on port', port);
            });
            console.log(server[port]);
        })
        .catch((error) => {
            console.log(error);
        });
};

function stopServer(port) {
    if (port === undefined)
    port = process.env.PORT;
    console.log("closing port " + port);

    if (server[port] && server[port].listening) { // Check if server is running
        server[port].close((err) => {
            if (err) {
                console.error('Error closing the server:', err);
            }
        });
    } else {
        console.error('Server is not running. Cannot close.');
    }
}

if (require.main === module) {
    startServer();
}

module.exports = { startServer, stopServer };
