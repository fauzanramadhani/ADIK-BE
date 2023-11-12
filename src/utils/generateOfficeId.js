const generateOfficeId = () => {
    const getRandomChar = (characters) => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    };

    const generateRandomString = (length, characters) => {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += getRandomChar(characters);
        }
        return result;
    };

    const generateRandomFormat = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";

        let result = "";
        for (let i = 0; i < 12; i++) {
            if (i % 4 === 0 && i !== 0) {
                // Setiap 4 karakter, tambahkan tanda hubung
                result += "-";
            }
            // Gunakan alfabet untuk setengah karakter
            // dan angka untuk setengah karakter
            const characters = i % 2 === 0 ? alphabet : numbers;
            result += generateRandomString(1, characters);
        }

        return result;
    };

    return generateRandomFormat();
};


module.exports = generateOfficeId;
