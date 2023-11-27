const SubscriptionModel = require("../../models/subscriptionModel");

const createSubscription = async ({
    subscriptionId,
    officeId,
    paymentId,
    package,
    expiredAt,
    status,
}) => {
    const createdAt = new Date().toISOString();
    const newSubscription = new SubscriptionModel({
        _id: subscriptionId,
        officeId: officeId,
        paymentId: paymentId,
        package: package,
        status: status,
        createdAt: createdAt,
        expiredAt: expiredAt,
    });
    await newSubscription.save();
    return newSubscription;
};


module.exports = createSubscription;
