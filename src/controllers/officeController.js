const createOffice = require("../middleware/mongodb/createOffice");
const generateOfficeId = require("../utils/generateOfficeId");

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
        if (!name || !officeImageUrl || !address || !location || !ownerDivision || !division || !shift) {
            throw new Error("All fields must be filled inh.");
        }
        const newOfficeId = generateOfficeId();
        const newOffice = await createOffice(
            newOfficeId,
            name,
            officeImageUrl,
            address,
            "ini location id woy",
            "ini divisi id woy",
            "ini shift id woy",
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
