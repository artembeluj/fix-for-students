const { loginService, registerService } = require("../../services");

const { User } = require("../../models/user");

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        if (user.banned === true){ return new Error('User banned')};
        const token = await loginService(email, password);
        res.json({ token });
    } else {
        const token = await registerService(name, email, password);
        res.json({ token });
    };
};

module.exports = register;