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

export const login = ({ username, password }) => ({
  type: FETCHING_USER,
  username,
  password,
});

export const logout = () => ({
  type: LOGGING_OUT_USER,
});

export const createUser = ({ username, password }) => ({
  type: CREATING_USER,
  username,
  password,
});

export const getUserFromSession = () => ({
  type: FETCHING_USER_FROM_SESSION,
});

export const resetError = () => ({
  type: RESET_NOTE_ERROR,
});
