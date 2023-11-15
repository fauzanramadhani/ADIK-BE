const mongoose = require("../config/mongodb");

const officeMemberSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    isOut: {
        type: Boolean,
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
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const OfficeMemberModel = mongoose.model("tb_office_member", officeMemberSchema);


module.exports = OfficeMemberModel;
