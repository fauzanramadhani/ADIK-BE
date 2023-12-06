const express = require("express");
const router = express.Router();

const officeController = require("../controllers/officeController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.get("/", checkAuth, officeController.getMyOfficeId);
router.get("/:officeId", checkAuth, officeController.getMyOfficeById);
router.post("/create", checkAuth, officeController.createOffice);
router.put("/image/:officeId", checkAuth, officeController.putImageOffice);
router.get("/image/:officeId/:filename", officeController.getImageOffice);
router.delete("/exit", checkAuth, officeController.exitOffice);
router.put("/join", checkAuth, officeController.joinOffice);


module.exports = router;
