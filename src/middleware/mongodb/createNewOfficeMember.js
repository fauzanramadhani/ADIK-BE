const OfficeMemberModel = require("../../models/officeMemberModel");

const createNewOfficeMember = async ({
    officeMemberId,
    role,
    userId,
    divisionId,
    officeId,
}) => {
    const createdAt = new Date().toISOString();
    const newOfficeMember = new OfficeMemberModel({
        _id: officeMemberId,
        role,
        userId,
        divisionId,
        officeId,
        createdAt,
    });
    await newOfficeMember.save();
    return newOfficeMember;
};


module.exports = createNewOfficeMember;
