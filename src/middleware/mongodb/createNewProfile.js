const ProfileModel = require("../../models/profilesModel");

const createNewProfile = async (
    mongoId, profilePicture, name, phoneNumber, address,
) => {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newProfile = new ProfileModel({
        _id: mongoId,
        profilePicture,
        name,
        phoneNumber,
        address,
        createdAt,
        updatedAt,
    });
    await newProfile.save();
    return newProfile;
};


module.exports = createNewProfile;
