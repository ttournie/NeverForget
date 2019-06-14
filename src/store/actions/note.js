import {
  get, post, put, deleteRequest,
} from '../../utils/api';
import asyncActionCreator from './asyncActionCreator';

// Action type
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

export const getUserNotes = asyncActionCreator({
  pending: FETCHING_NOTES,
  complete: FETCH_NOTES_SUCCEED,
  error: FETCH_NOTES_FAILED,
}, () => get('/notes'));

export const getNote = asyncActionCreator({
  pending: FETCHING_NOTES,
  complete: FETCH_NOTES_SUCCEED,
  error: FETCH_NOTES_FAILED,
}, id => get(`/notes/${id}`));

export const editNote = asyncActionCreator({
  pending: EDITING_NOTE,
  complete: EDIT_NOTE_SUCCEED,
  error: EDIT_NOTE_FAILED,
}, ({ id, title, body }) => put(`/notes/${id}`, {
  title,
  text: body,
}));

export const addNote = asyncActionCreator({
  pending: CREATING_NOTE,
  complete: CREATE_NOTE_SUCCEED,
  error: CREATE_NOTE_FAILED,
}, ({ title, body }) => post('/notes/', {
  title,
  text: body,
}));

export const deleteNote = asyncActionCreator({
  pending: DELETING_NOTE,
  complete: DELETE_NOTE_SUCCEED,
  error: DELETE_NOTE_FAILED,
}, id => deleteRequest(`/notes/${id}`));

export const resetError = () => ({
  type: RESET_NOTE_ERROR,
});
