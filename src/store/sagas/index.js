import {
  all,
} from 'redux-saga/effects';
import * as auth from './auth';
import * as note from './note';

export default function* rootSaga() {
  yield all([
    note.fetchUserNotesWatcher(),
    note.fetchNoteWatcher(),
    note.editNoteWatcher(),
    note.addNoteWatcher(),
    note.deleteNoteWatcher(),
    auth.createUserWatcher(),
    auth.fetchUserFromSessionWatcher(),
    auth.loginWatcher(),
    auth.logoutWatcher(),
  ]);
}
