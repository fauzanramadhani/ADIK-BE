const OfficeMemberModel = require("../../models/officeMemberModel");

const createOfficeMember = async ({
    officeMemberId,
    role,
    userId,
    divisionId,
    officeId,
}) => {
    const newOfficeMember = new OfficeMemberModel({
        _id: officeMemberId,
        role: role,
        userId: userId,
        divisionId: divisionId,
        officeId: officeId,
    });
    await newOfficeMember.save();
    return newOfficeMember;
};

module.exports = createOfficeMember;
