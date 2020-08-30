import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import AuthAPI from '../../api/auth';

export const login = (email, pwd) => async dispatch => {
    return AuthAPI.login(email, pwd)
    .then(res => {
        console.log(res.data);
        return dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
        });
    })
    .catch(err => {
        console.log(err);
    })
    dispatch({
        type : types.LOGIN_AUTH,
        email : email,
        token : "YEET",
    })
}

export const logout = () => async dispatch => {
    dispatch({
        type : types.LOGOUT_AUTH,
    })
}

export const register = (email, pwd, first, last) => {
    dispatch({
        type : types.LOGIN_AUTH,
        email : email,
        token : "YEET",
    })
}