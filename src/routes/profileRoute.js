const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.get("/profile", checkAuth, profileController.getProfile);
router.put("/profile", checkAuth, profileController.putProfile);
router.put("/profile/upload-profile-img", checkAuth, profileController.uploadProfileImg);


module.exports = router;
