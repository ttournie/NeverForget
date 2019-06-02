const assert = require("assert");
const { MongoClient } = require("mongodb");

let _db;
const URL = 'mongodb://localhost:27017/test'

const initDb = function(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    MongoClient.connect(URL, connected);
    function connected(err, client) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + URL);
        _db = client.db('test');
        return callback(null, _db);
    }
}

const getDb = function() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}


module.exports = {
    getDb,
    initDb
};