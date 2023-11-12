const UserModel = require("../../models/userModel");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        if (!authorization) {
            throw new Error("You must be logged in");
        }

        const userMongoId = authorization.replace("Bearer ", "");

        const user = await UserModel.findOne({_id: userMongoId});

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = checkAuth;
