const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;
