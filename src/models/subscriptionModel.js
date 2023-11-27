const mongoose = require("../config/mongodb");

const subscriptionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    officeId: {
        type: String,
    },
    paymentId: {
        type: String,
    },
    package: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    createdAt: {
        type: String,
    },
    expiredAt: {
        type: String,
    },
});

const SubscriptionModel = mongoose.model("tb_subscription", subscriptionSchema);


module.exports = SubscriptionModel;
