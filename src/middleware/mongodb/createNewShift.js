const ShiftModel = require("../../models/shiftModel");

const createNewShift = async ({
    shiftId,
    name,
    checkInHourStart,
    checkInHourEnd,
    checkOutHourStart,
    checkOutHourEnd,
    officeId,
}) => {
    const createdAt = new Date().toISOString();
    const newShift = new ShiftModel({
        _id: shiftId,
        name,
        checkInHourStart,
        checkInHourEnd,
        checkOutHourStart,
        checkOutHourEnd,
        officeId,
        createdAt,
    });
    await newShift.save();
    return newShift;
};


module.exports = createNewShift;
