const AuthOdm = require('../odm/authOdm');
const {generateUid} = require('../utils/generateUid.js');
const createNewUser = require('../repository/mongodb/createNewUser.js');
const setEmailVerified = require('../repository/firebase/setEmailVerified.js');

const register = async (req, res) => {
  try {
    const newMongoUid = generateUid(32);
    const {firebaseUid, email, loginMethod} = req.body;
    const findByEmail = await AuthOdm.findOne({email: email});

    if (findByEmail) {
      const updatedData = {
        $addToSet: {
          firebaseUid: firebaseUid,
          loginMethod: loginMethod,
        },
        emailVerified: true,
      };
      await AuthOdm.updateOne(
          {_id: findByEmail._id},
          updatedData,
      );
      const updatedUser = await AuthOdm.findOne({_id: findByEmail._id});
      updatedUser.firebaseUid.forEach(async (uid) => {
        await setEmailVerified(true, uid);
      });
      res.status(200).json({
        status: 'success',
        message: `${email} linked successfully with ${loginMethod}`,
        data: updatedUser,
      });
    } else {
      const result = await createNewUser(
          newMongoUid,
          firebaseUid,
          email,
          loginMethod,
      );
      res.status(200).json({
        status: 'success',
        message: `successfully created new user ${email}`,
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  register,
};
