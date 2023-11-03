const UserModel = require("../../models/usersModel");

const createNewUser = async (
    mongoId, firebaseUid, email, loginMethods,
) => {
    const createdAt = new Date().toISOString();
    const newUser = new UserModel({
        _id: mongoId,
        firebaseUids: [firebaseUid],
        email,
        loginMethods,
        createdAt,
    });
    await newUser.save();
    return newUser;
};


module.exports = createNewUser;
