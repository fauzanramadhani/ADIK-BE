const generateOfficeId = () => {
    // Fungsi untuk menghasilkan karakter acak dari daftar karakter yang diberikan
    const getRandomChar = (characters) => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    };

    // Fungsi untuk menghasilkan string acak dengan panjang tertentu
    const generateRandomString = (length) => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += getRandomChar(characters);
        }
        return result;
    };

    // Fungsi untuk menghasilkan string acak dengan format yang diinginkan
    const generateRandomFormat = () => {
        const format = "XXXX-XXXX-XXXX"; // Format
        let result = "";
        for (let i = 0; i < format.length; i++) {
            if (format[i] === "X") {
                result += generateRandomString(1);
            } else {
                result += format[i];
            }
        }
        return result;
    };

    return generateRandomFormat();
};

module.exports = generateOfficeId;
