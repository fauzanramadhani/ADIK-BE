const UserModel = require("../../models/usersModel");

const updatedProfileUser = async (
    mongoId, imageProfileUrl, name, phoneNumber, address,
) => {
    const updatedProfile = new UserModel({
        _id: mongoId,
        imageProfileUrl,
        name,
        phoneNumber,
        address,
    });
    await updatedProfile.save();
    return updatedProfile;
};


module.exports = updatedProfileUser;
