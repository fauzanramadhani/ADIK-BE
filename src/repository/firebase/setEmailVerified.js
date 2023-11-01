const admin = require('../../config/firebase.js');

const setEmailVerified = async (
    uid,
    emailVerified,
) => {
  await admin.auth().updateUser(uid, {
    emailVerified: emailVerified,
  });
};

module.exports = setEmailVerified;

