const {generateUid} = require('../repository/utils/generate-uid.js');
const {registerWithEmail} = require('../repository/firebase/authentication_firebase.js');
const {emitRegister} = require('../repository/mongo/authentication_mongo.js');

const registerWithEmailHandler = async (request, h) => {
  const contentType = request.headers['content-type'];
  console.log(contentType);

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

  const newUid = generateUid(32);

  return new Promise((resolve) => {
    registerWithEmail(
        newUid,
        payload.name,
        payload.phoneNumber,
        payload.email,
        payload.password,
        (result) => {
          if (result.success) {
            emitRegister(
                newUid,
                payload.name,
                payload.phoneNumber,
                payload.email,
                'email',
                false,
                (emit) => {
                  if (emit.success) {
                    resolve(
                        h.response({
                          status: 'success',
                          message: emit.message,
                          data: {
                            uid: newUid,
                          },
                        }).code(201),
                    );
                  } else {
                    resolve(
                        h.response({
                          status: 'error',
                          message: emit.message,
                        }).code(400),
                    );
                  }
                },
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
