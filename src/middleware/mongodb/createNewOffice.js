const OfficesModel = require("../../models/officeModel");

const createNewOffice = async (
    officeId,
    name,
    officeImageUrl,
    address,
    officeInvCodeId,
    officeMemberId,
    divisionId,
) => {
    const createdAt = new Date().toISOString();
    const newOffice = new OfficesModel({
        _id: officeId,
        name,
        officeImageUrl,
        officeInvCodeId,
        address,
        officeInvCodeId,
        officeMemberId: [officeMemberId],
        divisionId: [divisionId],
        createdAt,
    });
    await newOffice.save();
    return newOffice;
};


module.exports = createNewOffice;
