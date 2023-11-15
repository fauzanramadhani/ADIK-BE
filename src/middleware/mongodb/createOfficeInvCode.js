const OfficeInvCodeModel = require("../../models/officeInvCodeModel");

const createNewOfficeInvCode = async ({
    officeInvCodeId, officeInvCode, expiredDate, officeId,
}) => {
    const newOfficeInvCode = new OfficeInvCodeModel({
        _id: officeInvCodeId,
        officeInvCode: officeInvCode,
        expiredDate: expiredDate,
        officeId: officeId,
    });
    await newOfficeInvCode.save();
    return newOfficeInvCode;
};


module.exports = createNewOfficeInvCode;
