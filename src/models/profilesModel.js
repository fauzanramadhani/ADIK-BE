const mongoose = require("../config/mongodb");

const profileSchema = new mongoose.Schema({
    _id: {
        type: String,
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
    phoneNumber: {
        type: String,
        unique: true,
        minlength: 11,
        maxlength: 13,
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 200,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: String,
        default: Date.now,
    },
});

const ProfileModel = mongoose.model("Profiles", profileSchema);


module.exports = ProfileModel;
