const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    userRoutes(app, db);
}