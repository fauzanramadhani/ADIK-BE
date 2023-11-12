const UserModel = require("../../models/usersModel");

const updatedProfileUser = async (
    userMongoId, name, phoneNumber, address,
) => {
    const updatedProfile = new UserModel({
        _id: userMongoId,
        name,
        phoneNumber,
        address,
    });
    await updatedProfile.save();
    return updatedProfile;
};


module.exports = updatedProfileUser;
