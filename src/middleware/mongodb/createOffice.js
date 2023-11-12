const OfficesModel = require("../../models/officesModel");

const createOffice = async (
    officeId,
    name,
    officeImageUrl,
    address,
    locationId,
    officeMemberId,
    divisionId,
    shiftId,
) => {
    const newOffice = new OfficesModel({
        _id: officeId,
        name: name,
        officeImageUrl: officeImageUrl,
        address: address,
        locationId: locationId,
        officeMemberId: officeMemberId,
        divisionId: divisionId,
        shiftId: shiftId,
    });
    await newOffice.save();
    return newOffice;
};

module.exports = createOffice;
