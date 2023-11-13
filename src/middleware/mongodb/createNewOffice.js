const OfficesModel = require("../../models/officeModel");

const createNewOffice = async (
    officeId,
    name,
    officeImageUrl,
    address,
    locationId,
    officeMemberId,
    divisionId,
    shiftId,
) => {
    const createdAt = new Date().toISOString();
    const newOffice = new OfficesModel({
        _id: officeId,
        name,
        officeImageUrl,
        address,
        locationId: [locationId],
        officeMemberId: [officeMemberId],
        divisionId: [divisionId],
        shiftId: [shiftId],
        createdAt,
    });
    await newOffice.save();
    return newOffice;
};


module.exports = createNewOffice;
