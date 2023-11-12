const express = require("express");
const router = express.Router();

const {createOfficeController, editOffice, deleteOffice} = require("../controllers/officeController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.post("/create", checkAuth, createOfficeController);
router.put("/edit", checkAuth, editOffice);
router.delete("/delete", checkAuth, deleteOffice);

module.exports = router;
