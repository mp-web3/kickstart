const routes = require('next-routes')();

// This is how we tell routes what component to show at a certain url
routes
    .add('/campaigns/new', 'campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/campaigns/:address/requests', '/campaigns/requests/index')

module.exports = routes;
// we need to set up a server.js file and tell it to use server.js