const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Home route
app.get("/", (req, res) => {
    res.send("Server is up and running");
});

// Routes
app.use("/user", authRoute);


module.exports = app;
