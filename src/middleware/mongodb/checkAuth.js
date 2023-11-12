const UserModel = require("../../models/usersModel");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        if (!authorization) {
            throw new Error("You must be logged in");
        }

        const mongoId = authorization.replace("Bearer ", "");

        const user = await UserModel.findOne({_id: mongoId});

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = checkAuth;
