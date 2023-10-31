const User = require("../models/usersModel");

const firebaseAdmin = require("../config/firebase");


const register = async (req, res) => {
    try {
        const {name, email, phoneNumber, password} = req.body;

        const user = await firebaseAdmin.auth().createUser({
            email,
            phoneNumber,
            password,
        });

        const newUser = new User({
            _id: user.uid,
            name,
            email,
            phoneNumber,
            loginMethod: "email",
            emailVerified: user.emailVerified,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            data: newUser,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await firebaseAdmin.auth().getUserByEmail(email);

        if (user.emailVerified === false) {
            throw new Error("Email not verified");
        }

        await firebaseAdmin.auth().signInWithEmailAndPassword(email, password);

        res.status(200).json({
            message: "Login successful",
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};


module.exports = {register, login};
