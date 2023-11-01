const mongoose = require('../config/mongodb');

const profileSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  imageProfileUrl: {
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
    minlength: 10,
    maxlength: 14,
  },
  address: {
    type: String,
    required: true,
    maxlength: 500,
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

const ProfileOdm = mongoose.model('users_profile', profileSchema);


module.exports = ProfileOdm;
