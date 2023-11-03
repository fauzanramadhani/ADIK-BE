const mongoose = require("../config/mongodb");

const ranksPointSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    memberId: {
        type: String,
        required: true,
    },
    point: {
        type: Number,
        required: true,
    },
});

const RanksPointModel = mongoose.model("RankingsPoint", ranksPointSchema);


module.exports = RanksPointModel;
