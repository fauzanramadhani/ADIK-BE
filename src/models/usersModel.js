const mongoose = require("../config/mongodb");

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    firebaseUids: {
        type: Array,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "http://localhost:9000/images/defaultImg.jpeg",
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
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
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model("Users", userSchema);


module.exports = UserModel;
