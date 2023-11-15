const mongoose = require('mongoose');

const connectToDatabase = async (mongoURI) => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
};

const disconnectFromDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }
};

module.exports = { connectToDatabase, disconnectFromDatabase, mongoose };
