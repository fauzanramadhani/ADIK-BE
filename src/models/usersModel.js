require("dotenv").config();
const mongoose = require("../config/mongodb");

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firebaseUids: {
        type: Array,
        required: true,
    },
    imageProfileUrl: {
        type: String,
        default: process.env.BASE_URL + "public/images/default/default.jpeg",
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    loginMethods: {
        type: Array,
    },
    address: {
        type: String,
    },
    officeIds: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const UserModel = mongoose.model("Users", userSchema);


module.exports = UserModel;
