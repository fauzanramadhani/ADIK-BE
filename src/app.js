const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
// const profileRoute = require("./routes/profileRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/images", express.static(__dirname + "../../public/images/"));

// Home route
app.get("/", (req, res) => {
    res.send("Server is up and running");
});

// Routes
app.use("/user", authRoute);
// app.use("/user", profileRoute);


module.exports = app;
