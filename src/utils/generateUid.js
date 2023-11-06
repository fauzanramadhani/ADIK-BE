const generateUid = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLength = chars.length;
    let uid = "";

    for (let i = 0; i < length; i++) {
        uid += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return uid;
};


module.exports = generateUid;
