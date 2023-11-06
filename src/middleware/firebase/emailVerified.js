const firebaseAdmin = require("../../config/firebase.js");

const emailVerified = async ( uid, emailVerified ) => {
    try {
        await firebaseAdmin.auth().updateUser(uid, {
            emailVerified: emailVerified,
        });
    } catch (error) {
        console.log(error);
    }
};


module.exports = emailVerified;
