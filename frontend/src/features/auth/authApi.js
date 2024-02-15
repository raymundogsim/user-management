import axios from 'axios';
import { authStart, authSuccess, authFail, logout } from './authSlice';
import { api_url } from "../config";


export const signup = (userData) => async (dispatch) => {
    dispatch(authStart());
    try {
        const response = await axios.post(api_url + '/user/register', userData);
        console.log(response.data, 'signup')
        // dispatch(authSuccess(response.data));
        return true;
    } catch (error) {
        console.log(error)
        if (error.response) {
            let { data } = error.response;
            dispatch(authFail(data));
        }
        return false
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch(authStart());
    try {
        const response = await axios.post(api_url + '/user/login', userData);
        console.log(response.data)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
        }
        dispatch(authSuccess(response.data));
        return response.data
    } catch (error) {
        if (error.response) {
            let { data } = error.response;
            console.log(error, data)
            dispatch(authFail(data));
        }

        return null
    }
};

export const verifyCode = (code) => async (dispatch) => {
    dispatch(authStart());
    try {
        const response = await axios.get(api_url + `/user/verify?code=${code}`);
        // dispatch(authSuccess(response.data.user));
        console.log(response)
        return response.data;
    } catch (error) {
        if (error.response) {
            let { data } = error.response;
            console.log(error, data)
            dispatch(authFail(data));
        }
        return false
    }
};

export const getAuthUser = (userData) => async (dispatch) => {
    dispatch(authStart());
    try {
        const response = await axios.get(api_url + '/user/auth', userData);
        dispatch(authSuccess(response.data));
        return true
    } catch (error) {
        dispatch(authFail(error.message));
        return false
    }
};


export const updateUser = (userData, id) => async (dispatch) => {
    dispatch(authStart());
    try {
        const response = await axios.put(api_url + `/user/update/${id}`, userData);
        dispatch(getAuthUser());
        console.log(response.data, 'UPDATED!')
        return response.data
    } catch (error) {
        if (error.response) {
            let { data } = error.response;
            console.log(error, data)
            dispatch(authFail(data));
        }
        return null
    }
};

export const logoutUser = (userData) => async (dispatch) => {
    dispatch(logout());
    return true
};