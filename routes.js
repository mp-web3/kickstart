const routes = require('next-routes')();

// This is how we tell routes what component to show at a certain url
routes.add('/campaigns/:address', '/campaigns/show');

module.exports = routes;
// we need to set up a server.js file and tell it to use server.js