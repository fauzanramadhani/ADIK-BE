const mongoose = require("../config/mongodb");

const officeMemberSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    role: {
        type: String,
    },
    userId: {
        type: String,
    },
    divisionId: {
        type: String,
    },
    officeId: {
        type: String,
    },
    attendanceId: {
        type: Array,
    },
});

const OfficeMemberModel = mongoose.model("tb_office_member", officeMemberSchema);

module.exports = OfficeMemberModel;
