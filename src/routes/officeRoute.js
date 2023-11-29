const express = require("express");
const router = express.Router();

const officeController = require("../controllers/officeController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.get("/create", checkAuth, officeController.getOffice);
router.post("/create", checkAuth, officeController.createOffice);
router.put("/image/:officeId", checkAuth, officeController.putImageOffice);
router.get("/image/:officeId/:filename", officeController.getImageOffice);


module.exports = router;
