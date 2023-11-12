const mongoose = require("../config/mongodb");

const divisionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    officeId: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const DivisionModel = mongoose.model("tb_division", divisionSchema);


module.exports = DivisionModel;
