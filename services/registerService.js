const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

async function registerService(name, email, password) {
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ name, email, password: hashPassword, avatarURL });
    const payload = {
        id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(newUser._id, { token });
    return token;
};

module.exports = registerService;