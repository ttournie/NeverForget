import {
  put, takeEvery, call,
} from 'redux-saga/effects';
import {
  get, post, put as putRequest, deleteRequest,
} from '../../utils/api';

import {
  FETCHING_USER_NOTES,
  FETCHING_NOTES,
  FETCH_NOTES_FAILED,
  FETCH_NOTES_SUCCEED,
  EDITING_NOTE,
  EDIT_NOTE_FAILED,
  EDIT_NOTE_SUCCEED,
  CREATING_NOTE,
  CREATE_NOTE_FAILED,
  CREATE_NOTE_SUCCEED,
  DELETING_NOTE,
  DELETE_NOTE_FAILED,
  DELETE_NOTE_SUCCEED,
} from '../actions/note';

function* fetchUserNotes() {
  try {
    const payload = yield call(get, '/notes');
    yield put({ type: FETCH_NOTES_SUCCEED, payload });
  } catch (e) {
    yield put({ type: FETCH_NOTES_FAILED });
  }
}

export function* fetchUserNotesWatcher() {
  yield takeEvery(FETCHING_USER_NOTES, fetchUserNotes);
}

function* fetchNote(action) {
  try {
    const payload = yield call(get, `/notes/${action.id}`);
    yield put({ type: FETCH_NOTES_SUCCEED, payload });
  } catch (e) {
    yield put({ type: FETCH_NOTES_FAILED });
  }
}

export function* fetchNoteWatcher() {
  yield takeEvery(FETCHING_NOTES, fetchNote);
}

function* editNote(action) {
  const { id, title, body } = action;
  try {
    const payload = yield call(putRequest, `/notes/${id}`, {
      title,
      text: body,
    });
    yield put({ type: EDIT_NOTE_SUCCEED, payload });
  } catch (e) {
    yield put({ type: EDIT_NOTE_FAILED });
  }
}

export function* editNoteWatcher() {
  yield takeEvery(EDITING_NOTE, editNote);
}

function* addNote(action) {
  const { title, body } = action;
  try {
    const payload = yield call(post, '/notes/', {
      title,
      text: body,
    });
    yield put({ type: CREATE_NOTE_SUCCEED, payload });
  } catch (e) {
    yield put({ type: CREATE_NOTE_FAILED });
  }
}

export function* addNoteWatcher() {
  yield takeEvery(CREATING_NOTE, addNote);
}

function* deleteNote(action) {
  try {
    const payload = yield call(deleteRequest, `/notes/${action.id}`);
    const { data } = payload;
    yield put({ type: DELETE_NOTE_SUCCEED, payload: data });
  } catch (e) {
    yield put({ type: DELETE_NOTE_FAILED });
  }
}

export function* deleteNoteWatcher() {
  yield takeEvery(DELETING_NOTE, deleteNote);
}
