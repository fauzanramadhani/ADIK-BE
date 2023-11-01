const ProfileOdm = require('../../odm/profileOdm.js');

const createNewProfile = async (
    mongoId,
    imageProfileUrl,
    name,
    phoneNumber,
    address,
) => {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newProfileData = new ProfileOdm({
    _id: mongoId,
    imageProfileUrl: imageProfileUrl,
    name,
    phoneNumber,
    address,
    createdAt,
    updatedAt,
  });
  await newProfileData.save();
  return newProfileData;
};

module.exports = createNewProfile;
