const createNewProfile = require('../repository/mongodb/createNewProfile.js');

const saveProfile = async (req, res) => {
  try {
    const {mongoId, imageProfileUrl, name, phoneNumber, address} = req.body;
    const result = await createNewProfile(
        mongoId,
        imageProfileUrl,
        name,
        phoneNumber,
        address,
    );
    res.status(200).json({
      status: 'success',
      message: `successfully created new profile`,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {saveProfile};
