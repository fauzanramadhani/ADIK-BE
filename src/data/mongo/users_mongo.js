const mongoose = require('mongoose');
const {mongoAuth} = require('../../../mongo-key.js');

// Hubungkan ke server MongoDB (dalam hal ini,
// "mongo" adalah nama layanan yang Anda tentukan di Docker Compose)
mongoose.connect(mongoAuth, {useNewUrlParser: true, useUnifiedTopology: true});

// Definisikan model schema dan model untuk koleksi Anda
const userEntity = new mongoose.Schema({
  id: String,
  name: String,
  phoneNumber: String,
  email: String,
  loginMethod: String,
  createdAt: String,
  updatedAt: String,
  emailVerified: Boolean,
});

const UserModel = mongoose.model('Users', userEntity);
module.exports = UserModel;
