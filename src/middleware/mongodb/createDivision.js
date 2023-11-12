const DivisionModel = require("../../models/divisionsModel");

const createDivision = async (
    divisionId,
    name,
    officeId,
) => {
    const newDivision = new DivisionModel({
        _id: divisionId,
        name: name,
        officeId: officeId,
    });
    await newDivision.save();
    return newDivision;
};


module.exports = createDivision;
