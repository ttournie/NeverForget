const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).end();
  }
});

module.exports = router;
