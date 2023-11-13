const DivisionModel = require("../../models/divisionModel");

const createNewDivision = async (
    divisionId,
    name,
    officeId,
) => {
    const createdAt = new Date().toISOString();
    const newDivision = new DivisionModel({
        _id: divisionId,
        name,
        officeId,
        createdAt,
    });
    await newDivision.save();
    return newDivision;
};


module.exports = createNewDivision;
