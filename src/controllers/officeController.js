const UserModel = require("../models/userModel");
const OfficeModel = require("../models/officeModel");
const OfficeMemberModel = require("../models/officeMemberModel");
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

const createOffice = async (req, res) => {
    try {
        const {name, address, division} = req.body;
        const userMongoId = req.user._id;
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
            return await createNewDivision(newId, div.name, newOfficeId);
        }));

        await createNewOfficeMember({
            officeMemberId: newOfficeMemberId,
            role: "owner",
            isOut: false,
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
            userId: req.user._id,
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
            data: {
                officeId: newOffice._id,
            },
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
                data: {
                    imageOfficeUrl: office.officeImageUrl,
                },
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


module.exports = {createOffice, putImageOffice, getImageOffice};
