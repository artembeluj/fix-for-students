function messageHandlers(io, socket) {
    socket.on('message', (message, userColor) => {
        socket.broadcast.emit('message', message, userColor);
    });
};

module.exports = messageHandlers;