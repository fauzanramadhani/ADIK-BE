const getImageProfile = (req, res) => {
    const {filename} = req.params;

    return res.sendFile(`${__dirname}/uploads/images/profiles/${filename}`);
};


module.exports = getImageProfile;
