const jwt = require('jsonwebtoken');

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

connectedUsers = {};
userList = [];
inactiveUserList = [];

const authenticate = async (socket, next) => {
  const token = socket.handshake.auth.token;
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {

    if (err) return next(new Error('Authentication error'));

    const user = await User.findById(decoded.id, '-createdAt -updatedAt -password -token -email');

    if (!user) return next(new Error('User not found'));
    
    if (connectedUsers[decoded.id]) {
      connectedUsers[decoded.id].disconnect();
    };

    connectedUsers[decoded.id] = socket;
    socket.user = user;

    userList.push(socket.user);
    const allUsers = await User.find({}, '-createdAt -updatedAt -password -token -email');
    const inactiveUsers = allUsers.filter(user => !userList.find(activeUser => activeUser.id === user.id));
    inactiveUserList = inactiveUsers;
    next();
  });
};

module.exports = authenticate;