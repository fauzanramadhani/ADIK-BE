const express = require("express");
const router = express.Router();

const officeController = require("../controllers/officeController");
const checkAuth = require("../middleware/mongodb/checkAuth");

router.get("/", checkAuth, officeController.getMyOfficeId);
router.get("/:officeId", checkAuth, officeController.getMyOfficeById);
router.get("/image/:officeId/:filename", officeController.getImageOffice);
router.get("/member/:officeId", checkAuth, officeController.getOfficeMemberById);
router.get("/invitation-code/:officeId", checkAuth, officeController.getInviteCodeById);
router.get("/member-office/:officeMemberId", checkAuth, officeController.getOfficeMember);
router.post("/create", checkAuth, officeController.createOffice);
router.put("/image/:officeId", checkAuth, officeController.putImageOffice);
router.put("/join", checkAuth, officeController.joinOffice);
router.delete("/exit", checkAuth, officeController.exitOffice);


module.exports = router;
