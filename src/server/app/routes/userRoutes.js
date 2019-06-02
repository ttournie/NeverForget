const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const bcrypt = require('bcrypt');
const { getDb } = require('..//mongo/database');

const saltRounds = 10;
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
    let password = req.body.password;
    bcrypt.hash(password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
            res.json({error: 'could not create user'});
        }
        else {
            password = hashedPassword;
            const user = {
                username: req.body.username,
                password: hashedPassword,
            }  
            addUser(db, user, req, res);
        }
      }); 
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

module.exports = router;