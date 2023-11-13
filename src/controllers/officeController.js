const UserModel = require("../models/userModel");
const createNewOffice = require("../middleware/mongodb/createNewOffice");
const createNewOfficeMember = require("../middleware/mongodb/createNewOfficeMember");
const createNewLocation = require("../middleware/mongodb/createNewLocation");
const createNewDivision = require("../middleware/mongodb/createNewDivision");
const generateMongoId = require("../utils/generateMongoId");
const generateOfficeId = require("../utils/generateOfficeId");


const createOffice = async (req, res) => {
    try {
        const {name, officeImageUrl, address, location, ownerDivision, division} = req.body;
        const userMongoId = req.user._id;

        const newOfficeId = generateOfficeId();
        const newOfficeMemberId = generateMongoId(32);

        const newLocationIds = await Promise.all(location.map(async (loc) => {
            const newId = generateMongoId(32);
            const newLocation = await createNewLocation(newId, loc.latitude, loc.longitude);
            return newLocation._id;
        }));

        const newDivisions = await Promise.all(division.map(async (div) => {
            const newId = generateMongoId(32);
            return await createNewDivision(newId, div.name, newOfficeId);
        }));

        const ownerDivisionObject = newDivisions.find((div) => div.name === ownerDivision);

        await createNewOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "Owner",
            userId: userMongoId,
            divisionId: ownerDivisionObject._id,
            officeId: newOfficeId,
        });

        const newOffice = await createNewOffice(
            newOfficeId,
            name,
            officeImageUrl,
            address,
            newLocationIds,
            newOfficeMemberId,
            ownerDivisionObject._id,
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
