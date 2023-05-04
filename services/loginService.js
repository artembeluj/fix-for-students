const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

async function loginService(email, password) {
    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    return token;
}

module.exports = loginService;

