const generateOfficeInvCode = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let oId = "";
    for (let i = 0; i < 12; i++) {
        const isNumeric = Math.random() < 0.5; // 50% kesempatan numerik
        const keys = isNumeric ? numbers : alphabet;
        const randomIndex = Math.floor(Math.random() * keys.length);
        oId += keys[randomIndex];
        if (i % 4 === 3 && i !== 11) oId += "-";
    }

    return oId;
};

module.exports = generateOfficeInvCode;
