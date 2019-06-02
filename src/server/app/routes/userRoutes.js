const express = require('express');
const md5 = require('md5');
const ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const { getDb } = require('..//mongo/database');

var router = express.Router();

async function addUser(db, user, req, res) {
    try {
        await db.collection('users').insertOne(user, (err, result) => {
        req.login(result.ops[0], () => {
            res.json({user: result.ops[0]});
            })
        });
    } catch (err) {
        res.json({error: 'could not create user'});
    }
}

// router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     const details = {_id: new ObjectId(id)};
//     const db = getDb();
//     db.collection('users').findOne(details, (err, user) => {
//         if (err) {
//             res.send({ 'error' : 'An error as occured' });
//         } else {
//             res.send(user);
//         }
//     })
// });

router.get('/logout', (req, res) => {
    console.log('test');
    req.logout();
    res.end();
});

router.post('/', (req, res) => {
    const db = getDb();
    const user = {
        username: req.body.username,
        password: md5(req.body.password),
    }   
    addUser(db, user, req, res);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

module.exports = router;