const { io } = require('./app'); // Adjust the import path as needed

// Your controller logic
const sendMessageToClients = (message) => {
    io.emit('chatMessage', message);
};

module.exports = { sendMessageToClients };
