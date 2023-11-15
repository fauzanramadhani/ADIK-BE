const mongoose = require("../config/mongodb");

const officeInvCodeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    officeInvCode: {
        type: String,
    },
    expiredDate: {
        type: String,
        default: "unlimited",
    },
    officeId: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const OfficeInvCodeModel = mongoose.model("tb_office_inv_code", officeInvCodeSchema);


module.exports = OfficeInvCodeModel;
