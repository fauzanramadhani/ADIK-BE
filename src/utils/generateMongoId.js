const generateMongoId = (length) => {
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let uId = "";
    for (let i = 0; i < length; i++) {
        uId += keys.charAt(Math.floor(Math.random() * keys.length));
    }

    return uId;
};


module.exports = generateMongoId;
