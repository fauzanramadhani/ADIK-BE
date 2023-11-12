const UserModel = require("../models/userModel");
const createNewUser = require("../middleware/mongodb/createNewUser");
const generateMongoId = require("../utils/generateMongoId");


const auth = async (req, res) => {
    const {firebaseUid, email, loginMethod} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if (!user) {
            const newUserMongoId = generateMongoId(32);

            user = await createNewUser(newUserMongoId, firebaseUid, email, loginMethod);

            return res.status(200).json({
                status: "success",
                message: "User created successfully",
                data: {
                    userMongoId: user._id,
                },
            });
        } else {
            if (!user.loginMethod.includes(loginMethod)) {
                user.firebaseUid.push(firebaseUid);
                user.loginMethod.push(loginMethod);
                await user.save();

                return res.status(200).json({
                    status: "success",
                    message: "User login successfully with a new login method",
                    data: {
                        userMongoId: user._id,
                    },
                });
            } else {
                return res.status(200).json({
                    status: "success",
                    message: "User login successfully",
                    data: {
                        userMongoId: user._id,
                    },
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {auth};
