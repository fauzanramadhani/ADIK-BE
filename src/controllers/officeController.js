const UserModel = require("../models/userModel");
const createNewOfficeInvCode = require("../middleware/mongodb/createOfficeInvCode");
const createNewOffice = require("../middleware/mongodb/createNewOffice");
const createNewOfficeMember = require("../middleware/mongodb/createNewOfficeMember");
const createNewDivision = require("../middleware/mongodb/createNewDivision");
const generateMongoId = require("../utils/generateMongoId");
const generateOfficeInvCode = require("../utils/generateOfficeInvCode");

const createOffice = async (req, res) => {
    try {
        const {name, officeImageUrl, address, ownerDivision, division} = req.body;
        const userMongoId = req.user._id;
        const newOfficeId = generateMongoId(32);
        const newOfficeMemberId = generateMongoId(32);
        const newOfficeInvCodeId = generateMongoId(32);
        const newOfficeInvCode = generateOfficeInvCode();

        await createNewOfficeInvCode({
            officeInvCodeId: newOfficeInvCodeId,
            officeInvCode: newOfficeInvCode,
            officeId: newOfficeId,
        });

        const newDivisions = await Promise.all(division.map(async (div) => {
            const newId = generateMongoId(32);
            return await createNewDivision(newId, div.name, newOfficeId);
        }));

        const ownerDivisionObject = newDivisions.find((div) => div.name === ownerDivision);

        await createNewOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "Owner",
            isOut: false,
            userId: userMongoId,
            divisionId: ownerDivisionObject._id,
            officeId: newOfficeId,
        });

        const newOffice = await createNewOffice(
            newOfficeId,
            name,
            officeImageUrl,
            address,
            newOfficeInvCodeId,
            newOfficeMemberId,
            newDivisions.map((div) => div._id),
        );

        await UserModel.findByIdAndUpdate(
            userMongoId,
            {$push: {officeId: newOfficeId}},
            {new: true},
        );

        return res.status(200).json({
            status: "success",
            message: "Office created successfully",
            data: {
                officeId: newOffice._id,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {createOffice};
