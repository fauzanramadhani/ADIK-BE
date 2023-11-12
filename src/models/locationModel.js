const mongoose = require("../config/mongodb");

const locationSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const LocationModel = mongoose.model("tb_location", locationSchema);


module.exports = LocationModel;
