const admin = require('firebase-admin');
const serviceAccount = require('../../../firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const registerWithEmail = (
    uid,
    displayName,
    phoneNumber,
    email,
    password,
    callback,
) => {
  admin.auth()
      .createUser({
        uid: uid,
        displayName: displayName,
        phoneNumber, phoneNumber,
        email: email,
        password: password,
      })
      .then((userRecord) => {
        // Callback sukses dengan status true dan pesan sukses
        callback({success: true, message: 'Successfully created new user'});
      })
      .catch((error) => {
        // Callback gagal dengan status false dan pesan kesalahan
        callback({success: false, message: error.message});
      });
};

module.exports = {registerWithEmail};
