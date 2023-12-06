const OfficeMemberModel = require("../../models/officeMemberModel");

const createNewOfficeMember = async ({
    officeMemberId,
    role,
    userId,
    divisionId,
    officeId,
}) => {
    const newOfficeMember = new OfficeMemberModel({
        _id: officeMemberId,
        role,
        userId,
        divisionId,
        officeId,
    });
    await newOfficeMember.save();
    return newOfficeMember;
};


module.exports = createNewOfficeMember;
