const multer = require("multer");
const fs = require("fs");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `uploads/images/profiles/${req.user._id}`;
        fs.mkdirSync(dir, {recursive: true});
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const dir = `uploads/images/profiles/${req.user._id}`;
        fs.readdirSync(dir).forEach((existingFile) => {
            fs.unlinkSync(path.join(dir, existingFile));
        });
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "-"));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(
            path.extname(file.originalname).toLowerCase(),
        );
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error("Only support .jpeg, .jpg, .png"));
        }
    },
});


module.exports = upload;
