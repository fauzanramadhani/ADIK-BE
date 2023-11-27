const PaymentModel = require("../../models/paymentModel");

const createNewPayment = async ({
    paymentId,
    paymentProvider,
    price,
    amount,
    providerFee,
    subTotal,
    paymentProviderId,
    userId,
    officeId,
}) => {
    const createdAt = new Date().toISOString();
    const newPayment = new PaymentModel({
        _id: paymentId,
        paymentProvider: paymentProvider,
        price: price,
        amount: amount,
        providerFee: providerFee,
        subTotal: subTotal,
        paymentProviderId: paymentProviderId,
        userId: userId,
        officeId: officeId,
        createdAt: createdAt,
    });
    await newPayment.save();
    return newPayment;
};


module.exports = createNewPayment;
