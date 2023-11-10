const UserModel = require("../../models/usersModel");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        if (!authorization) {
            return res.status(401).json({message: "You must be logged in"});
        }

        const mongoId = authorization.replace("Bearer ", "");

        const user = await UserModel.findOne({_id: mongoId});

        if (!user) {
            return res.status(401).json({message: "You must be logged in"});
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({message: "You must be logged in"});
    }
};


module.exports = checkAuth;
