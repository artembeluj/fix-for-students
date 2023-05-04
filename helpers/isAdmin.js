function isAdmin(fn) {
    return (io, socket) => {
        if (socket.user.role === "admin") {
            fn(io, socket);
        } else {
            console.log('Unauthorized access attempt by non-admin user.');
        };
    };
}

module.exports = isAdmin;