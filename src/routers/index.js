const { router: todoRoutes } = require('./todo');
const { router: userRoutes } = require('./user');
const { router: adminRoutes } = require('./admin');

module.exports = { todoRoutes, userRoutes, adminRoutes };
