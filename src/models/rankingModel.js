const mongoose = require("../config/mongodb");

const rankingSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    month: {
        type: Number,
    },
    onTimeEntryPoint: {
        type: Number,
    },
    lateEntryPoint: {
        type: Number,
    },
    onTimeOutPoint: {
        type: Number,
    },
    officeMemberId: {
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

const RankingModel = mongoose.model("tb_rangking", rankingSchema);


module.exports = RankingModel;
