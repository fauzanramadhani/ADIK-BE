const {generateUid} = require('../repository/utils/generate-uid.js');
const {registerWithEmail} = require('../repository/firebase/authentication.js');

const registerWithEmailHandler = async (request, h) => {
  const contentType = request.headers['content-type'];

  if (contentType !== 'application/x-www-form-urlencoded') {
    return h.response({
      status: 'error',
      message: 'Unsupported Media Type',
    }).code(415);
  }

  const {payload} = request;

  if (!payload.name || !payload.phoneNumber || !payload.address || !payload.email || !payload.password) {
    return h.response({
      status: 'error',
      message: 'Missing required attributes (name, phoneNumber, address, email, or password)',
    }).code(400);
  }
  return new Promise((resolve) => {
    registerWithEmail(
        generateUid(32),
        payload.name,
        payload.phoneNumber,
        payload.email,
        payload.password,
        (result) => {
          if (result.success) {
            console.log(result.message);
            resolve(
                h.response({
                  status: 'success',
                  message: result.message,
                }).code(201),
            );
          } else {
            resolve(
                h.response({
                  status: 'error',
                  message: result.message,
                }).code(400),
            );
          }
        },
    );
  });
};

module.exports = {
  registerWithEmailHandler,
};
