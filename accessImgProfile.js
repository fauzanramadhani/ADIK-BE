const getImageProfile = (req, res) => {
    const {userMongoId, filename} = req.params;

    return res.sendFile(`${__dirname}/uploads/images/profiles/${userMongoId}/${filename}`);
};


module.exports = getImageProfile;
