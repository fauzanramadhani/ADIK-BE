const mongoose = require("../config/mongodb");

const rankSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    rankingMonthIds: {
        type: Array,
    },
});

const RankingModel = mongoose.model("Rankings", rankSchema);


module.exports = RankingModel;
