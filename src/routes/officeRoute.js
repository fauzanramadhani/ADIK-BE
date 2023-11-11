const express = require("express");
const router = express.Router();

const {createOfficeController, editOffice, deleteOffice} = require("../controllers/officeController");

router.post("/create", createOfficeController);
router.put("/edit", editOffice);
router.delete("/delete", deleteOffice);

module.exports = router;
