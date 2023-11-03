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
    profilePicture: {
        type: String,
        default: "../../public/images/defaultImg.jpeg",
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        minlength: 11,
        maxlength: 13,
    },
    loginMethods: {
        type: Array,
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 200,
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
