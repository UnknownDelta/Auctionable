const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data');
const app = express();
dotenv.config();

const server = require('http').createServer();

// Allow requests from all origins during development (not recommended for production)

const users = {}; // To keep track of connected users
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    socket.on('identify_user', (userId) => {
        console.log('User identified:', userId);
        users[userId] = socket;
        console.log('Current users:', users);
        // console.log('User identified:', userId, 'Socket ID:', socket.id);
    });

    socket.on('send_message', (message) => {
        console.log('Message received:', message);
        const recipientSocket = users[message.recipientId];
        if (recipientSocket) {
            recipientSocket.emit('receive_message', message);
        } 
        else {
            console.log('Recipient not found:', message.recipientId);
        }
    });
    return () => {
        socket.off('receive_message');
    };
});


const PORT = process.env.PORT;

server.listen(PORT , () => {
    console.log(`Express Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.log('Error starting server:', err);
});

