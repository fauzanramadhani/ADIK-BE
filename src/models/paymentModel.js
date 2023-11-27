const mongoose = require("../config/mongodb");

const paymentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    paymentProvider: {
        type: String,
    },
    price: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    providerFee: {
        type: Number,
    },
    subTotal: {
        type: Number,
    },
    paymentProviderId: {
        type: String,
    },
    userId: {
        type: String,
    },
    officeId: {
        type: String,
    },
    createdAt: {
        type: String,
    },
});

const PaymentModel = mongoose.model("tb_payment", paymentSchema);


module.exports = PaymentModel;
