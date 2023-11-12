const ShiftModel = require("../../models/shiftModel");

const createShift = async ({
    shiftId,
    name,
    checkInHourStart,
    checkInHourEnd,
    checkOutHourStart,
    checkOutHourEnd,
    officeId,
}) => {
    const newShift = new ShiftModel({
        _id: shiftId,
        name: name,
        checkInHourStart: checkInHourStart,
        checkInHourEnd: checkInHourEnd,
        checkOutHourStart: checkOutHourStart,
        checkOutHourEnd: checkOutHourEnd,
        officeId: officeId,
    });
    await newShift.save();
    return newShift;
};

module.exports = createShift;
