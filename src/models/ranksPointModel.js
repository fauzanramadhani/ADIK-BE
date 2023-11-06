const mongoose = require("../config/mongodb");

const ranksPointSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    memberId: {
        type: String,
    },
    point: {
        type: Number,
    },
});

const RanksPointModel = mongoose.model("RankingsPoint", ranksPointSchema);


module.exports = RanksPointModel;
