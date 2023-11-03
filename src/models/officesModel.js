const mongoose = require("../config/mongodb");

const officeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    address: {
        type: String,
        minlength: 10,
        maxlength: 200,
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
        type: Date,
        default: Date.now,
    },
});

const OfficeModel = mongoose.model("Offices", officeSchema);


module.exports = OfficeModel;
