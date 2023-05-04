const { User } = require("../../models/user")

async function changeUserRole(userList) {
    try {
        const id = userList[0]._id;
        const role = "admin";
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = changeUserRole;