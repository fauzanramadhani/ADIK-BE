const express = require("express");
const router = express.Router();

const officeController = require("../controllers/officeController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.post("/create", checkAuth, officeController.createOffice);


module.exports = router;
