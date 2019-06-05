const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');

module.exports = function route(app) {
  noteRoutes(app);
  userRoutes(app);
};
