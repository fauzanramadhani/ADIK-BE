const UserDao = require('../dao/userDao');
const {generateUid} = require('../utils/generateUid.js');
const createNewUser = require('../repository/mongodb/createNewUser.js');
const setEmailVerified = require('../repository/firebase/setEmailVerified.js');

const register = async (req, res) => {
  try {
    const newMongoUid = generateUid(32);
    const {firebaseUid, name, email, phoneNumber, loginMethod} = req.body;
    const findByEmail = await UserDao.findOne({email: email});

    if (findByEmail) {
      const updatedData = {
        $addToSet: {
          firebaseUid: firebaseUid,
          loginMethod: loginMethod,
        },
        emailVerified: true,
      };
      await UserDao.updateOne(
          {_id: findByEmail._id},
          updatedData,
      );
      const updatedUser = await UserDao.findOne({_id: findByEmail._id});
      updatedUser.firebaseUid.forEach(async (uid) => {
        await setEmailVerified(true, uid);
      });
      res.status(200).json({
        status: 'success',
        message: `Linked user ${email}`,
        data: updatedUser,
      });
    } else {
      const createNewUserCallback = await new Promise((resolve, reject) => {
        createNewUser(
            newMongoUid,
            firebaseUid,
            email,
            name,
            phoneNumber,
            loginMethod,
            (result) => {
              resolve(result);
            },
        );
      });

      res.status(200).json({
        status: 'success',
        message: `New user ${email} created`,
        data: createNewUserCallback.data,
      });
    }
  } catch (err) {
    res.status(200).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  register,
};
