const mongoose = require("../config/mongodb");

const ranksMonthSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
    },
    rankingPointIds: {
        type: Array,
    },
});

const RanksMonthModel = mongoose.model("RankingsMonth", ranksMonthSchema);


module.exports = RanksMonthModel;
