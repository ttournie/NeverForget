const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/test';

mongoose.connect(URL, { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = db;
