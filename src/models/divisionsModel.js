const mongoose = require("../config/mongodb");

const divisionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    memberIds: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const DivisionModel = mongoose.model("Divisions", divisionSchema);


module.exports = DivisionModel;
