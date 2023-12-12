const UserModel = require("../models/userModel");
const OfficeInvCodeModel = require("../models/officeInvCodeModel");
const LocationModel = require("../models/locationModel");
const OfficeModel = require("../models/officeModel");
const OfficeMemberModel = require("../models/officeMemberModel");
const RankingModel = require("../models/rankingModel");
const DivisionModel = require("../models/divisionModel");
const ShiftModel = require("../models/shiftModel");
const SubscriptionModel = require("../models/subscriptionModel");
const PaymentModel = require("../models/paymentModel");
const createNewOfficeInvCode = require("../middleware/mongodb/createOfficeInvCode");
const createNewOffice = require("../middleware/mongodb/createNewOffice");
const createNewOfficeMember = require("../middleware/mongodb/createNewOfficeMember");
const createNewDivision = require("../middleware/mongodb/createNewDivision");
const createNewPayment = require("../middleware/mongodb/createNewPayment");
const createNewSubscription = require("../middleware/mongodb/createNewSubscription");
const generateMongoId = require("../utils/generateMongoId");
const generateOfficeInvCode = require("../utils/generateOfficeInvCode");
const {imageStorage, uploadImage} = require("../utils/uploadImg");
const fs = require("fs");


const getMyOfficeById = async (req, res) => {
    try {
        const userMongoId = req.user.id;
        const officeId = req.params.officeId;
        const user = await UserModel.findOne({_id: userMongoId});
        if (!user) {
            throw new Error("User Not Found");
        }
        const office = await OfficeModel.findOne({_id: officeId});
        if (!office) {
            throw new Error("Office Not Found");
        }
        const officeMember = await OfficeMemberModel.findOne({
            userId: userMongoId,
            officeId: officeId,
        });
        if (!officeMember) {
            throw new Error("You are not the member of this office");
        }

        let myDivision = undefined;
        if (officeMember.divisionId) {
            const getMyDivision = await DivisionModel.findOne({
                _id: officeMember.divisionId,
            });
            myDivision = getMyDivision.name;
        }

        return res.status(200).json({
            status: "success",
            message: "Get office successfully",
            data: {
                officeId: office._id,
                role: officeMember.role,
                name: office.name,
                officeImageUrl: office.officeImageUrl,
                address: office.address,
                division: myDivision,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const getMyOfficeId = (req, res) => {
    try {
        const user = req.user;

        return res.status(200).json({
            status: "success",
            message: "Get my office id successfully",
            data: user.officeId,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const createOffice = async (req, res) => {
    try {
        const {name, address, division} = req.body;
        const userMongoId = req.user.id;
        const newOfficeId = generateMongoId(32);
        const newOfficeMemberId = generateMongoId(32);
        const newOfficeInvCodeId = generateMongoId(32);
        const newOfficeInvCode = generateOfficeInvCode();
        const newPaymentId = generateMongoId(32);
        const newSubscriptionId = generateMongoId(32);

        await createNewOfficeInvCode({
            officeInvCodeId: newOfficeInvCodeId,
            officeInvCode: newOfficeInvCode,
            officeId: newOfficeId,
        });

        const newDivisions = await Promise.all(division.map(async (div) => {
            const newId = generateMongoId(32);
            return await createNewDivision(newId, div, newOfficeId);
        }));

        await createNewOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "owner",
            userId: userMongoId,
            officeId: newOfficeId,
        });

        const newPayment = await createNewPayment({
            paymentId: newPaymentId,
            price: 0,
            amount: 1,
            providerFee: 0,
            subTotal: 0,
            officeMemberId: newOfficeMemberId,
            userId: userMongoId,
            officeId: newOfficeId,
        });

        const newSubscription = await createNewSubscription({
            subscriptionId: newSubscriptionId,
            officeId: newOfficeId,
            paymentId: newPayment._id,
            package: "trial",
            status: true,
            expiredAt: "unlimited",
        });

        const newOffice = await createNewOffice({
            officeId: newOfficeId,
            name: name,
            address: address,
            officeInvCodeId: newOfficeInvCodeId,
            officeMemberId: newOfficeMemberId,
            divisionId: newDivisions.map((div) => div._id),
            subscriptionId: newSubscription._id,
        });

        await UserModel.findByIdAndUpdate(
            userMongoId,
            {$push: {
                paymentId: newPaymentId,
                officeId: newOfficeId,
            }},
            {new: true},
        );

        return res.status(200).json({
            status: "success",
            message: "Office created successfully",
            data: newOffice._id,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const putImageOffice = async (req, res) => {
    try {
        const officeId = req.params.officeId;
        const office = await OfficeModel.findOne({_id: officeId});
        if (!office) {
            throw new Error("Office Not Found");
        }
        const officeMember = await OfficeMemberModel.findOne({
            userId: req.user.id,
            officeId: officeId,
        });
        if (!officeMember) {
            throw new Error("You is not the member of this office");
        }
        if (officeMember.role != "owner") {
            throw new Error("You is not the owner of this office");
        }

        const storage = imageStorage({
            dir: `office/image/${officeId}`,
            fileName: `${Date.now()}`,
        });
        const uploadNew = uploadImage({
            storage: storage,
        });
        uploadNew.single("imageOffice")(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }

            const {file} = req;

            if (!file) {
                return res.status(400).json({
                    status: "error",
                    message: "Please upload an image",
                });
            }

            office.officeImageUrl = `${process.env.BASE_URL}${file.path.replace("src/", "")}`;

            await office.save();

            return res.status(200).json({
                status: "success",
                message: "Office image updated successfully",
                data: office.officeImageUrl,
            });
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const getImageOffice = (req, res) => {
    try {
        const {officeId, filename} = req.params;
        const imagePath = `/usr/src/app/office/image/${officeId}/${filename}`;

        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(400).json({
                    status: "error",
                    message: "Image Not Found",
                });
            }

            res.sendFile(imagePath);
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const joinOffice = async (req, res) => {
    try {
        const {officeInvCode} = req.body;
        const officeInv = await OfficeInvCodeModel.findOne({
            officeInvCode: officeInvCode,
        });
        if (!officeInv) {
            throw new Error("Invitation Code is Invalid");
        }
        const office = await OfficeModel.findById(officeInv.officeId);
        if (!office) {
            throw new Error("Office not found");
        }
        if (req.user.officeId.includes(office._id)) {
            throw new Error("You already in this office");
        };
        const newOfficeMemberId = generateMongoId(32);
        await OfficeModel.findByIdAndUpdate(
            office._id,
            {$push: {
                officeMemberId: newOfficeMemberId,
            }},
            {new: true},
        );
        await UserModel.findByIdAndUpdate(
            req.user._id,
            {$push: {
                officeId: office._id,
            }},
            {new: true},
        );
        await createNewOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "member",
            userId: req.user._id,
            officeId: office._id,
        });
        return res.status(200).json({
            status: "success",
            message: "Join office successfully",
            data: office._id,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    };
};

const exitOffice = async (req, res) => {
    try {
        const user = req.user;
        const {
            officeId,
            isDelete,
            newOwnerOfficeMemberId,
        } = req.body;
        const office = await OfficeModel.findOne({_id: officeId});
        if (!office) {
            throw new Error("Office Not Found");
        }
        const officeMember = await OfficeMemberModel.findOne({
            userId: user.id,
            officeId: officeId,
        });
        if (!officeMember) {
            throw new Error("You is not the member of this office");
        }
        if (isDelete == "true") {
        // DELETE
            if (officeMember.role != "owner") {
                throw new Error("You is not the owner of this office");
            };
            office.officeMemberId.map( async (memberId) => {
                const getMember = await OfficeMemberModel.findOne({_id: memberId});
                const member = await UserModel.findOne({_id: getMember.userId});
                const getOfficeIndex = member.officeId.indexOf(officeId);
                member.officeId.splice(getOfficeIndex, 1);
                await member.save();
            });
            office.locationId.map( async (locId) => {
                await LocationModel.deleteOne({_id: locId});
            });
            await OfficeMemberModel.deleteMany({officeId: officeId});
            await OfficeInvCodeModel.deleteMany({officeId: officeId});
            await RankingModel.deleteMany({officeId: officeId});
            await DivisionModel.deleteMany({officeId: officeId});
            await ShiftModel.deleteMany({officeId: officeId});
            await SubscriptionModel.deleteMany({officeId: officeId});
            await OfficeModel.deleteOne({_id: officeId});
            await PaymentModel.deleteMany({officeId: officeId});

            return res.status(200).json({
                status: "success",
                message: "Exit and Delete office successfully",
            });
        } else {
            if (officeMember.role == "owner") {
                // Change office owner
                const newOwnerOfficeMember = await OfficeMemberModel
                    .findById(newOwnerOfficeMemberId);
                if (!newOwnerOfficeMember) {
                    throw new Error("New owner account not found");
                }
                newOwnerOfficeMember.role = "owner";
                newOwnerOfficeMember.save();
            };
            officeMember.role = "-";
            await officeMember.save();
            const officeIndex = user.officeId.indexOf(officeId);
            user.officeId.splice(officeIndex, 1);
            await user.save();
            return res.status(200).json({
                status: "success",
                message: "Exit office successfully",
            });
        };
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

const getOfficeMemberById = async (req, res) => {
    try {
        const {officeId} = req.params;
        const office = await OfficeModel.findOne({_id: officeId});
        if (!office) {
            throw new Error("Office Not Found");
        }
        const officeMember = await OfficeMemberModel.find({
            officeId: officeId,
        });
        if (!officeMember) {
            throw new Error("Office Member Not Found");
        }
        const officeMemberData = await Promise.all(officeMember.map(async (member) => {
            const user = await UserModel.findOne({_id: member.userId});
            return {
                userId: user._id,
            };
        }));
        return res.status(200).json({
            status: "success",
            message: "Get office member successfully",
            data: officeMemberData,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    };
};

// getInviteCode by params officeId
const getInviteCodeById = async (req, res) => {
    try {
        const {officeId} = req.params;
        const office = await OfficeModel.findOne({_id: officeId});
        if (!office) {
            throw new Error("Office Not Found");
        }
        const officeInvCode = await OfficeInvCodeModel.findOne({
            officeId: officeId,
        });
        if (!officeInvCode) {
            throw new Error("Office Invitation Code Not Found");
        }
        return res.status(200).json({
            status: "success",
            message: "Get office invitation code successfully",
            data: officeInvCode.officeInvCode,
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    };
};

// getOfficeMember by office member id paraam
const getOfficeMember = async (req, res) => {
    try {
        const {officeMemberId} = req.params;
        const officeMember = await OfficeMemberModel.findOne({
            _id: officeMemberId,
        });
        if (!officeMember) {
            throw new Error("Office Member Not Found");
        }
        const user = await UserModel.findOne({_id: officeMember.userId});
        if (!user) {
            throw new Error("User Not Found");
        }
        return res.status(200).json({
            status: "success",
            message: "Get office member successfully",
            data: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: officeMember.role,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message,
        });
    };
};

module.exports = {
    getMyOfficeById,
    createOffice,
    putImageOffice,
    getImageOffice,
    getMyOfficeId,
    joinOffice,
    exitOffice,
    getOfficeMemberById,
    getInviteCodeById,
    getOfficeMember,
};
