const { ObjectId } = require('mongodb');
const debug = require('debug')('app:note');
const noteModel = require('../models/note');

async function createNote(note, req, res, next) {
  try {
    const newNote = await noteModel.create(note);
    res.send(newNote);
  } catch (err) {
    debug('error while creating a user');
    next(err);
  }
}

function addNote(req, res, next) {
  const { title, text } = req.body;
  const { user } = req;
  const { _id } = user;
  debug(`adding note to user ${_id}`);
  const note = {
    title,
    text,
    author: _id,
  };
  createNote(note, req, res, next);
}

async function editNote(req, res, next) {
  const { id } = req.params;
  const {
    title,
    text,
  } = req.body;
  try {
    const oldNote = await noteModel.findOne({ _id: ObjectId(id) });
    oldNote.title = title;
    oldNote.text = text;
    const editedNote = await oldNote.save();
    res.send(editedNote);
  } catch (err) {
    debug('error editing a note');
    next(err);
  }
}

async function deleteNote(req, res, next) {
  const { _id } = req.body;
  try {
    await noteModel.deleteOne({ _id: ObjectId(_id) });
    res.end();
  } catch (err) {
    debug('error while deleting note');
    next(err);
  }
}

async function getNote(req, res, next) {
  const { id } = req.params;
  try {
    const note = await noteModel.findOne({ _id: ObjectId(id) });
    res.send(note);
  } catch (err) {
    debug('error while getting a note');
    next(err);
  }
}

async function getAllNotes(req, res, next) {
  const { _id } = req.user;
  try {
    const notes = await noteModel.find({ author: ObjectId(_id) });
    res.send(notes);
  } catch (err) {
    debug('error while getting list of notes');
    next(err);
  }
}

const noteController = {
  addNote,
  editNote,
  deleteNote,
  getNote,
  getAllNotes,
};

module.exports = noteController;
