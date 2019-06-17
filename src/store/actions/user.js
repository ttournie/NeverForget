import Cookies from 'js-cookie';
import { get, post } from '../../utils/api';
import asyncActionCreator from './asyncActionCreator';

// Action type
export const FETCHING_USER = 'FETCHING_USER';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';
export const FETCH_USER_SUCCEED = 'FETCH_USER_SUCCEED';
export const LOGGING_OUT_USER = 'LOGGING_OUT_USER';
export const LOG_OUT_USER_FAILED = 'LOG_OUT_USER_FAILED';
export const LOG_OUT_USER_SUCCEED = 'LOG_OUT_USER_SUCCEED';
export const CREATING_USER = 'CREATING_USER';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const CREATE_USER_SUCCEED = 'CREATE_USER_SUCCEED';
export const FETCHING_USER_FROM_SESSION = 'FETCHING_USER_FROM_SESSION';
export const FETCH_USER_FROM_SESSION_FAILED = 'FETCH_USER_FROM_SESSION_FAILED';
export const FETCH_USER_FROM_SESSION_SUCCEED = 'FETCH_USER_FROM_SESSION_SUCCEED';
export const RESET_NOTE_ERROR = 'RESET_NOTE_ERROR';

export const login = asyncActionCreator({
  pending: FETCHING_USER,
  complete: FETCH_USER_SUCCEED,
  error: FETCH_USER_FAILED,
}, ({ username, password }) => post('/login', {
  username,
  password,
}), () => Cookies.set('user_cookie', { isAuthenticated: true }, { expires: 7 }));

export const logout = asyncActionCreator({
  pending: LOGGING_OUT_USER,
  complete: LOG_OUT_USER_SUCCEED,
  error: LOG_OUT_USER_FAILED,
}, () => get('/logout'), () => Cookies.remove('user_cookie'));

export const createUser = asyncActionCreator({
  pending: CREATING_USER,
  complete: CREATE_USER_SUCCEED,
  error: CREATE_USER_FAILED,
}, ({ username, password }) => post('/subscribe', {
  username,
  password,
}), () => Cookies.set('user_cookie', { isAuthenticated: true }, { expires: 7 }));

const setUserFromSession = payload => ({
  type: FETCH_USER_FROM_SESSION_SUCCEED,
  payload,
});

export const getUserFromSession = () => async (dispatch) => {
  dispatch({ type: FETCHING_USER_FROM_SESSION });
  try {
    const data = await get('/logged-user');
    dispatch(setUserFromSession(data));
  } catch (err) {
    // The server session is not valid anymore so the cookie needs to be removed
    Cookies.remove('user_cookie');
    dispatch({ type: FETCH_USER_FROM_SESSION_FAILED });
  }
};

export const resetError = () => ({
  type: RESET_NOTE_ERROR,
});
