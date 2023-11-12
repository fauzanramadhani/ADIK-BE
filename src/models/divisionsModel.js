const mongoose = require("../config/mongodb");

const divisionSchema = new mongoose.Schema({
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
    officeId: {
        type: String,
    },
});

const DivisionModel = mongoose.model("tb_division", divisionSchema);

module.exports = DivisionModel;
