const createLocation = require("../middleware/mongodb/createLocation");
const createDivision = require("../middleware/mongodb/createDivision");
const createOfficeMember = require("../middleware/mongodb/createOfficeMember");
const createOffice = require("../middleware/mongodb/createOffice");
const generateOfficeId = require("../utils/generateOfficeId");
const generateUid = require("../utils/generateUid");
const UserModel = require("../models/usersModel");

const createOfficeController = async (req, res) => {
    try {
        const {
            name,
            officeImageUrl,
            address,
            location,
            ownerDivision,
            division,
            shift,
        } = req.body;
        // Cek requirment field
        if (!name || !officeImageUrl || !address || !location || !ownerDivision || !division || !shift) {
            throw new Error("All fields must be filled in.");
        }

        const newOfficeId = generateOfficeId();
        const newOfficeMemberId = generateUid(32);
        const {authorization} = req.headers;
        const userMongoId = authorization.replace("Bearer ", "");

        // Menambahkan semua location ke tb_location dan menyimpan semua id nya.
        const newLocationId = await Promise.all(location.map(async (location, index) => {
            const newId = generateUid(32);
            const newLocation = await createLocation(
                newId,
                location.latitude,
                location.longitude,
            );

            return newLocation._id;
        }));

        // Menambahkan semua divisi kedalam tb_division dan menyimpan mongo objeknya.
        const newDivision = await Promise.all(division.map(async (division, index) => {
            const newId = generateUid(32);
            const newDivision = await createDivision(
                newId,
                division.name,
                newOfficeId,
            );
            return newDivision;
        }));

        // Mencari divisi owner atau pembuat kantor menggunakan objek mongo newDivision
        const ownerDivisionObject = newDivision.find((division) => division.name === ownerDivision);

        // Menambahkan owner atau pembuat kantor ke tb_office_member
        await createOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "Owner",
            userId: userMongoId,
            divisionId: ownerDivisionObject._id,
            officeId: newOfficeId,
        });

        // Menambahkan kantor ke tb_office
        const newOffice = await createOffice(
            newOfficeId,
            name,
            officeImageUrl,
            address,
            newLocationId,
            newOfficeMemberId,
            newDivision._id,
        );

        // Menambahkan id kentor ke tb_user
        await UserModel.findByIdAndUpdate(
            userMongoId,
            {
                $push: {officeId: newOfficeId},
            },
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

const editOffice = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Fauzan ganteng poll",
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteOffice = async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            message: "Fauzan ganteng poll",
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    createOfficeController,
    editOffice,
    deleteOffice,
};
