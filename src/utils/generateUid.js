// Jangan dihapus, ini untuk generate random uid kedepannya.

const generateUid = (size) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let uid = '';

  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uid += characters.charAt(randomIndex);
  }

  return uid;
};

module.exports = {generateUid};
