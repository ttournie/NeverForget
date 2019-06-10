const express = require('express');
const {
  addNote,
  getNote,
  deleteNote,
  editNote,
  getAllNotes,
} = require('../controllers/noteController');

const router = express.Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}

router.use(isAuth);

router.get('/', getAllNotes);
router.get('/:id', getNote);
router.delete('/:id', deleteNote);
router.put('/:id', editNote);
router.post('/', addNote);

module.exports = router;
