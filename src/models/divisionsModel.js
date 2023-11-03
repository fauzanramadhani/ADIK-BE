const mongoose = require("../config/mongodb");

const divisionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    memberIds: {
        type: Array,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const DivisionModel = mongoose.model("Divisions", divisionSchema);


module.exports = DivisionModel;
