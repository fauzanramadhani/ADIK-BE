const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const authenticationRoutes = require('../routes/authentication_routes.js');

const init = async () => {
  const server = Hapi.server({
    port: 5001,
    host: '0.0.0.0',
  });

  const routes = [
    ...authenticationRoutes,
  ];
  server.route(routes);

  await server.register(Inert);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
