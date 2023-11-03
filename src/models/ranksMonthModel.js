const mongoose = require("../config/mongodb");

const ranksMonthSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    rankingPointIds: {
        type: Array,
    },
});

const RanksMonthModel = mongoose.model("RankingsMonth", ranksMonthSchema);


module.exports = RanksMonthModel;
