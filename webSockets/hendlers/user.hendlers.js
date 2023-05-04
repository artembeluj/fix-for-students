const { changeUserRole } = require("../services");

function userHandlers(io, socket) {
    changeUserRole(userList);
    socket.emit('user', socket.user);
    io.emit('active_users', userList);

    socket.on('disconnect', () => {
        userList = userList.filter((item) => item !== socket.user);
    });
};

module.exports = userHandlers;