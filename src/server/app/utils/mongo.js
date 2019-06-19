const mongoose = require('mongoose');
// returns a function which returns either a compiled model, or a precompiled model
// s is a String for the model name e.g. "User", and model is the mongoose Schema
function getModel(s, model) {
  return () => (mongoose.modelNames().indexOf(s) === -1
    ? mongoose.model(s, model)
    : mongoose.connection.model(s));
}
module.exports = getModel;
