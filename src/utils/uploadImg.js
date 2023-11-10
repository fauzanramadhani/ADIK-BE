const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/images/profiles/",
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
