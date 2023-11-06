const mongoose = require("../config/mongodb");

const officeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    ownerIds: {
        type: Array,
    },
    memberIds: {
        type: Array,
    },
    rankingIds: {
        type: Array,
    },
    divisionIds: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});

const OfficeModel = mongoose.model("Offices", officeSchema);


module.exports = OfficeModel;
