const mongoose = require('../config/mongodb');

const userSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 14,
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

const UserDao = mongoose.model('users', userSchema);


module.exports = UserDao;
