const multer = require("multer");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `uploads/images/profiles/${req.user._id}`;
        fs.mkdirSync(dir, {recursive: true});
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "-"));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null, true);
        } else {
            cb(new Error("Only image allowed"));
        }
    },
});


module.exports = upload;
