const socketIo = require('socket.io');

function initializeSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('chatMessage', (message) => {
            console.log('Received message:', message);
            io.emit('chatMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
}
// export { io };
module.exports = initializeSocket;
