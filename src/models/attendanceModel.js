const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    onSite: {
        type: Boolean,
    },
    imageAttendanceUrl: {
        type: String,
    },
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    checkInTimeStart: {
        type: String,
    },
    checkInTimeEnd: {
        type: String,
    },
    checkOutTimeStart: {
        type: String,
    },
    checkOutTimeEnd: {
        type: String,
    },
    status: {
        type: String,
    },
    officeMemberId: {
        type: String,
    },
    officeId: {
        type: String,
    },
    shiftId: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const AttendanceModel = mongoose.model("tb_attendance", attendanceSchema);


module.exports = AttendanceModel;
