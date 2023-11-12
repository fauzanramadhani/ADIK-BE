const LocationModel = require("../../models/locationModel");

const createLocation = async (
    locationId,
    latitude,
    longitude,
) => {
    const newLocation = new LocationModel({
        _id: locationId,
        latitude: latitude,
        longitude: longitude,
    });
    await newLocation.save();
    return newLocation;
};

module.exports = createLocation;
