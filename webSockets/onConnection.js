const {userHandlers, messageHandlers, adminHendlers} = require("./hendlers");

function onConnection (io, socket) {
    userHandlers(io, socket);
    messageHandlers(io, socket);
    adminHendlers(io, socket);
  };

  module.exports = onConnection;