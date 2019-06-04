const assert = require('assert');
const { MongoClient } = require('mongodb');

// eslint-disable-next-line no-underscore-dangle
let _db;
const URL = 'mongodb://localhost:27017/test';

// eslint-disable-next-line consistent-return
const initDb = function initDb(callback) {
  if (_db) {
    console.warn('Trying to init DB again!');
    return callback(null, _db);
  }
  function connected(err, client) {
    if (err) {
      return callback(err);
    }
    console.log(`DB initialized - connected to: ${URL}`);
    _db = client.db('test');
    return callback(null, _db);
  }
  MongoClient.connect(URL, connected);
};

const getDb = function getDb() {
  assert.ok(_db, 'Db has not been initialized. Please called init first.');
  return _db;
};


module.exports = {
  getDb,
  initDb,
};
