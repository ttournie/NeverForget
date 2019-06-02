import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config/config';

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

const setUserAfterLogin = (user) => ({
    type: FETCH_USER_SUCCEED,
    user,
})

const setUserAfterSubscription = (user) => ({
    type: CREATE_USER_SUCCEED,
    user,
})

const clearUser = () => ({
    type: LOG_OUT_USER_SUCCEED,
})

export const login = ({username, password}) => async(dispatch) => {
    dispatch({type: FETCHING_USER});
    try {
        const response = await axios.post(`${config.apiUrl}/user/login`, {
            username,
            password
        })
        const { data } = response;
        dispatch(setUserAfterLogin(data));
        Cookies.set('user_cookie', data, { expires: 7 });
    } catch (err) {
        dispatch({type: FETCH_USER_FAILED});
    }
}

export const logout = () => async(dispatch) => {
    dispatch({type: LOGGING_OUT_USER});
    try {
        await axios.get(`${config.apiUrl}/user/logout`);
        dispatch(clearUser());
        Cookies.remove('user_cookie');
    } catch (err) {
        dispatch({type: LOG_OUT_USER_FAILED});
    }
}

export const createUser = ({username, password}) => async(dispatch) => {
    dispatch({type: CREATING_USER});
    try {
        const response = await axios.post(`${config.apiUrl}/user`, {
            username,
            password
        })
        const { data } = response;
        dispatch(setUserAfterSubscription(data));
        Cookies.set('user_cookie', data, { expires: 7 });
    } catch (err) {
        dispatch({type: CREATE_USER_FAILED});
    }
}