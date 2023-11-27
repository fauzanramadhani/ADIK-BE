const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const officeRoute = require("./routes/officeRoute");

const getImageProfile = require("../accessImgProfile");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Home route
app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.get("/public/images/default/:filename", (req, res) => {
    const {filename} = req.params;
    return res.sendFile(__dirname + "/public/images/default/" + filename);
});

app.get("/uploads/images/profiles/:userMongoId/:filename", getImageProfile);


// Routes
app.use("/user", authRoute);
app.use("/user", profileRoute);
app.use("/office", officeRoute);


module.exports = app;
