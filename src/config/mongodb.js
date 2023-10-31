require("dotenv").config();

const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const mongoDB = mongoose.connection;

mongoDB.on("error", console.error.bind(console, "connection error:"));
mongoDB.once("open", () => {
    console.log("Database connected");
});


module.exports = mongoDB;
