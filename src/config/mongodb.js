require("dotenv").config();

const moongose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

moongose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const mongoDB = moongose.connection;

mongoDB.on("error", console.error.bind(console, "connection error:"));
mongoDB.once("open", () => {
    console.log("Database connected");
});


module.exports = mongoDB;
