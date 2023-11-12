const mongoose = require("../config/mongodb");

const shiftSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    name: {
        type: String,
    },
    checkInHourStart: {
        type: String,
    },
    checkInHourEnd: {
        type: String,
    },
    checkOutHourStart: {
        type: String,
    },
    checkOutHourEnd: {
        type: String,
    },
    officeId: {
        type: String,
    },
});

const ShiftModel = mongoose.model("tb_shift", shiftSchema);

module.exports = ShiftModel;
