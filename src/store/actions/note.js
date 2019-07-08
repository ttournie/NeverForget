import {
  get,
} from '../../utils/api';

// Action type
export const FETCHING_USER_NOTES = 'FETCHING_USER_NOTES';
export const FETCHING_NOTES = 'FETCHING_NOTE';
export const FETCH_NOTES_FAILED = 'FETCH_NOTE_FAILED';
export const FETCH_NOTES_SUCCEED = 'FETCH_NOTES_SUCCEED';
export const EDITING_NOTE = 'EDITING_NOTE';
export const EDIT_NOTE_FAILED = 'EDIT_NOTE_FAILED';
export const EDIT_NOTE_SUCCEED = 'EDIT_NOTE_SUCCEED';
export const CREATING_NOTE = 'CREATING_NOTE';
export const CREATE_NOTE_FAILED = 'CREATE_NOTE_FAILED';
export const CREATE_NOTE_SUCCEED = 'CREATE_NOTE_SUCCEED';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETE_NOTE_FAILED = 'DELETE_NOTE_FAILED';
export const DELETE_NOTE_SUCCEED = 'DELETE_NOTE_SUCCEED';
export const RESET_NOTE_ERROR = 'RESET_NOTE_ERROR';

export const fetchNote = async (id) => {
  const data = await get(`/notes/${id}`);
  return data;
};

export const getUserNotes = () => ({
  type: FETCHING_USER_NOTES,
});

export const getNote = id => ({
  type: FETCHING_NOTES,
  id,
});

export const editNote = ({ id, title, body }) => ({
  type: EDITING_NOTE,
  id,
  title,
  body,
});

export const addNote = ({ title, body }) => ({
  type: CREATING_NOTE,
  title,
  body,
});

export const deleteNote = id => ({
  type: DELETING_NOTE,
  id,
});

export const resetError = () => ({
  type: RESET_NOTE_ERROR,
});
