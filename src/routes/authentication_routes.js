const {
  registerWithEmailHandler,
} = require('../handler/authentication_handler.js');

const authenticationRoutes = [
  {
    method: 'POST',
    path: '/register',
    handler: registerWithEmailHandler,
  },
];

module.exports = authenticationRoutes;
