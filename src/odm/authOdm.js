const mongoose = require('../config/mongodb');

const authSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firebaseUid: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loginMethod: {
    type: Array,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

const AuthOdm = mongoose.model('users_auth', authSchema);


module.exports = AuthOdm;
