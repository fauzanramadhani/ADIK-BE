const AuthOdm = require('../../odm/authOdm.js');

const createNewUser = async (
    mongoId,
    firebaseUid,
    email,
    loginMethod,
) => {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newUser = new AuthOdm({
    _id: mongoId,
    firebaseUid: firebaseUid,
    email,
    loginMethod: loginMethod,
    emailVerified: loginMethod === 'google',
    createdAt,
    updatedAt,
  });
  await newUser.save();
  return newUser;
};
module.exports = createNewUser;
