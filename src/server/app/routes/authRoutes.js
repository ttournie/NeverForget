const express = require('express');
const passport = require('passport');
const { subscribe, logout, getLoggedUserInfo } = require('../controllers/authController');

const router = express.Router();

router.get('/logged-user', getLoggedUserInfo);
router.get('/logout', logout);
router.post('/subscribe', subscribe);
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

module.exports = router;
