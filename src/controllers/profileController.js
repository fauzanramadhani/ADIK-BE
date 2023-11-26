require("dotenv").config();
const {upload, imageStorage, uploadImage} = require("../utils/uploadImg");
const fs = require("fs");


const getProfile = async (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            status: "success",
            message: "Get user profile successfully",
            data: {
                email: user.email,
                imageProfileUrl: user.imageProfileUrl,
                name: user.name,
                phoneNumber: user.phoneNumber,
                address: user.address,
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
        const user = req.user;
        const {name, phoneNumber, address} = req.body;

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
        upload.single("imageProfile")(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }

            const {file} = req;
            const user = req.user;

            if (!file) {
                return res.status(400).json({
                    status: "error",
                    message: "Please upload an image",
                });
            } else {
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

const putProfileImage = async (req, res) => {
    try {
        const storage = imageStorage({
            dir: `user/profile/image/${req.user._id}`,
            fileName: `${Date.now()}`,
        });

        const uploadNew = uploadImage({
            storage: storage,
        });

        uploadNew.single("imageProfile")(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }

            const {file} = req;
            const user = req.user;

            if (!file) {
                return res.status(400).json({
                    status: "error",
                    message: "Please upload an image",
                });
            } else {
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

const getImageProfile = (req, res) => {
    try {
        const {userMongoId, filename} = req.params;
        const imagePath = `/usr/src/app/user/profile/image/${userMongoId}/${filename}`;

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    message: "Image Not Found",
                });
            }

            res.sendFile(imagePath);
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {getProfile, putProfile, uploadProfileImg, putProfileImage, getImageProfile};
