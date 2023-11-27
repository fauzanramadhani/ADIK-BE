const OfficeMemberModel = require("../../models/officeMemberModel");

const createNewOfficeMember = async ({
    officeMemberId,
    role,
    isOut,
    userId,
    divisionId,
    officeId,
}) => {
    const newOfficeMember = new OfficeMemberModel({
        _id: officeMemberId,
        role,
        isOut,
        userId,
        divisionId,
        officeId,
    });
    await newOfficeMember.save();
    return newOfficeMember;
};


module.exports = createNewOfficeMember;
