const { User } = require("../../models/user");
const { isAdmin, hendlerWrapper } = require("../../helpers/index");

const adminHendlers = isAdmin((io, socket) => {

    io.emit('inactive_users', inactiveUserList);

    socket.on("ban_user", hendlerWrapper(async (userId, banState) => {
        const user = await User.findByIdAndUpdate(userId, { banned: !banState }, { new: true });
        connectedUsers[user._id].disconnect();
    }));

    socket.on("mute_user", hendlerWrapper(async (userId, muteState) => {
        const user = await User.findByIdAndUpdate(userId, { muted: !muteState }, { new: true });
        io.emit("user_muted", user._id);
    }));
});

module.exports = adminHendlers;