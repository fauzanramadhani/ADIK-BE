const UserDao = require('../../dao/userDao.js');

const createNewUser = async (
    newMongoUid,
    firebaseUid,
    email,
    name,
    phoneNumber,
    loginMethod,
    callback,
) => {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newUser = new UserDao({
    _id: newMongoUid,
    firebaseUid: firebaseUid,
    name,
    email,
    phoneNumber: `+62${phoneNumber}`,
    loginMethod: loginMethod,
    emailVerified: loginMethod === 'google',
    createdAt,
    updatedAt,
  });
  await newUser.save();
  callback({data: newUser});
};
module.exports = createNewUser;
