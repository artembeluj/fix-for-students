const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const roles = ["user", "admin"];

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles,
        default: "user"
    },
    banned: {
        type: Boolean,
        default: false
    },
    muted: {
        type: Boolean,
        default: false
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};