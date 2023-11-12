const mongoose = require("../config/mongodb");

const officeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    officeImageUrl: {
        type: String,
    },
    address: {
        type: String,
    },
    locationId: {
        type: Array,
    },
    officeMemberId: {
        type: Array,
    },
    rankingId: {
        type: Array,
    },
    divisionId: {
        type: Array,
    },
    shiftId: {
        type: Array,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const OfficeModel = mongoose.model("tb_office", officeSchema);


module.exports = OfficeModel;
