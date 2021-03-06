import Cookies from 'js-cookie';
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
  RESET_NOTE_ERROR,
} from '../actions/user';

const initialState = {
  userInfo: Cookies.getJSON('user_cookie'),
  isAuthenticated: typeof Cookies.get('user_cookie') !== 'undefined' ? Cookies.getJSON('user_cookie').isAuthenticated : false,
  fetching: false,
  error: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
    case CREATING_USER:
    case FETCHING_USER_FROM_SESSION:
      return { ...state, error: false, fetching: true };

    case FETCH_USER_SUCCEED:
    case CREATE_USER_SUCCEED:
    case FETCH_USER_FROM_SESSION_SUCCEED:
      return {
        ...state, userInfo: action.payload, error: false, fetching: false, isAuthenticated: true,
      };

    case FETCH_USER_FAILED:
    case CREATE_USER_FAILED:
    case FETCH_USER_FROM_SESSION_FAILED:
      return {
        ...state, userInfo: {}, fetching: false, error: true, isAuthenticated: false,
      };

    case LOGGING_OUT_USER:
      return { ...state, error: false, fetching: true };

    case LOG_OUT_USER_SUCCEED:
      return {
        ...state, userInfo: {}, error: false, fetching: false, isAuthenticated: false,
      };

    case LOG_OUT_USER_FAILED:
      return { ...state, fetching: false, error: true };

    case RESET_NOTE_ERROR:
      return { ...state, error: false };

    default:
      return state;
  }
};

export default user;
