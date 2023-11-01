require('dotenv').config();

const mongoose = require('mongoose');

const mongoUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

const mongoAuth = `mongodb://${mongoUsername}:${mongoPassword}@mongo:27017/adik?authSource=admin`;

mongoose.connect(
    mongoAuth, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
);

module.exports = mongoose;
