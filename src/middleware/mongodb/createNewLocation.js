const LocationModel = require("../../models/locationModel");

const createNewLocation = async (
    locationId,
    latitude,
    longitude,
) => {
    const createdAt = new Date().toISOString();
    const newLocation = new LocationModel({
        _id: locationId,
        latitude,
        longitude,
        createdAt,
    });
    await newLocation.save();
    return newLocation;
};


module.exports = createNewLocation;
