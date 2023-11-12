const UserModel = require("../../models/userModel");

const createNewUser = async (
    userMongoId, firebaseUid, email, loginMethod,
) => {
    const createdAt = new Date().toISOString();
    const newUser = new UserModel({
        _id: userMongoId,
        firebaseUid: [firebaseUid],
        email,
        loginMethod: [loginMethod],
        createdAt,
    });
    await newUser.save();
    return newUser;
};


module.exports = createNewUser;
