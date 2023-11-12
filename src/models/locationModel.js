const mongoose = require("../config/mongodb");

const locationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
});

const LocationModel = mongoose.model("tb_location", locationSchema);

module.exports = LocationModel;
