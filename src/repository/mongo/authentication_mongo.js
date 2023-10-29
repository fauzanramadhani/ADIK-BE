const UserModel = require('../../data/mongo/users_mongo');

const emitRegister = async (
    uid,
    name,
    phoneNumber,
    email,
    loginMethod,
    emailVerified,
    callback,
) => {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  try {
    const newUser = new UserModel({
      _id: uid,
      name,
      phoneNumber,
      email,
      loginMethod,
      createdAt,
      updatedAt,
      emailVerified,
    });
    await newUser.save();
    callback({success: true, message: 'Successfully emit new user'});
  } catch (error) {
    callback({success: false, message: error.message});
  }
};

module.exports = {emitRegister};
