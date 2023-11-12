require("dotenv").config();
const mongoose = require("../config/mongodb");

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    firebaseUid: {
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
    loginMethod: {
        type: Array,
    },
    address: {
        type: String,
    },
    officeId: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const UserModel = mongoose.model("tb_user", userSchema);


module.exports = UserModel;
