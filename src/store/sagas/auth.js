import {
  put, takeLatest, call,
} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import { get, post } from '../../utils/api';

import {
  FETCHING_USER,
  FETCH_USER_SUCCEED,
  FETCH_USER_FAILED,
  LOGGING_OUT_USER,
  LOG_OUT_USER_SUCCEED,
  LOG_OUT_USER_FAILED,
  CREATING_USER,
  CREATE_USER_SUCCEED,
  CREATE_USER_FAILED,
  FETCHING_USER_FROM_SESSION,
  FETCH_USER_FROM_SESSION_SUCCEED,
  FETCH_USER_FROM_SESSION_FAILED,
} from '../actions/user';

function* createUser(action) {
  const { username, password } = action;
  try {
    const payload = yield call(post, '/subscribe', {
      username,
      password,
    });
    Cookies.set('user_cookie', { isAuthenticated: true }, { expires: 7 });
    yield put({ type: CREATE_USER_SUCCEED, payload });
  } catch (e) {
    yield put({ type: CREATE_USER_FAILED });
  }
}

export function* createUserWatcher() {
  yield takeLatest(CREATING_USER, createUser);
}

function* fetchUserFromSession() {
  try {
    const payload = yield call(get, '/logged-user');
    yield put({ type: FETCH_USER_FROM_SESSION_SUCCEED, payload });
  } catch (err) {
    // The server session is not valid anymore so the cookie needs to be removed
    Cookies.remove('user_cookie');
    yield put({ type: FETCH_USER_FROM_SESSION_FAILED });
  }
}

export function* fetchUserFromSessionWatcher() {
  yield takeLatest(FETCHING_USER_FROM_SESSION, fetchUserFromSession);
}

function* login(action) {
  const { username, password } = action;
  try {
    const payload = yield call(post, '/login', {
      username,
      password,
    });
    Cookies.set('user_cookie', { isAuthenticated: true }, { expires: 7 });
    yield put({ type: FETCH_USER_SUCCEED, payload });
  } catch (e) {
    yield put({ type: FETCH_USER_FAILED });
  }
}

export function* loginWatcher() {
  yield takeLatest(FETCHING_USER, login);
}

function* logout() {
  try {
    yield call(get, '/logout');
    Cookies.remove('user_cookie');
    yield put({ type: LOG_OUT_USER_SUCCEED });
  } catch (e) {
    yield put({ type: LOG_OUT_USER_FAILED });
  }
}

export function* logoutWatcher() {
  yield takeLatest(LOGGING_OUT_USER, logout);
}
