import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';

export const login = (email, pwd) => async dispatch => {
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