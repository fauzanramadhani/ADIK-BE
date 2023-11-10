require("dotenv").config();
const upload = require("../utils/uploadImg");


const getProfile = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            status: "success",
            message: "Get user profile successfully",
            data: {
                imageProfileUrl: user.imageProfileUrl,
                name: user.name,
                phoneNumber: user.phoneNumber,
                address: user.address,
                officeId: user.officeId,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const putProfile = async (req, res) => {
    try {
        const {imageProfileUrl, name, phoneNumber, address} = req.body;
        const user = req.user;

        user.imageProfileUrl = imageProfileUrl;
        user.name = name;
        user.phoneNumber = phoneNumber;
        user.address = address;

        await user.save();

        return res.status(200).json({
            status: "success",
            message: "User profile updated successfully",
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const uploadProfileImg = async (req, res) => {
    try {
        upload.single("imageProfileUrl")(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }

            const {file} = req;
            const user = req.user;

            if (file) {
                user.imageProfileUrl = process.env.BASE_URL + file.path.replace("src/", "");
            }

            await user.save();

            return res.status(200).json({
                status: "success",
                message: "User profile image updated successfully",
                data: {
                    imageProfileUrl: user.imageProfileUrl,
                },
            });
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {getProfile, putProfile, uploadProfileImg};
