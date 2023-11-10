const UserModel = require("../models/usersModel");
const createNewUser = require("../middleware/mongodb/createNewUser");
const generateUid = require("../utils/generateUid");


const auth = async (req, res) => {
    const {email, loginMethods, firebaseUid} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if (!user) {
            const newMongoId = generateUid(32);

            user = await createNewUser(newMongoId, firebaseUid, email, loginMethods);

            return res.status(200).json({
                status: "success",
                message: "User created successfully",
                data: {
                    userMongoId: user._id,
                },
            });
        } else {
            if (!user.loginMethods.includes(loginMethods)) {
                user.loginMethods.push(loginMethods);
                user.firebaseUids.push(firebaseUid);
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
