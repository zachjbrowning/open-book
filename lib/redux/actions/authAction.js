import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import AuthAPI from '../../api/auth';

export const login = (email, pwd) => async dispatch => {
    return AuthAPI.login(email, pwd)
    .then(res => {
        return dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
        });
    })
    .catch(err => {
        var str = "";
        for (var name of Object.keys(err.response.data)) {
            str = str.concat('\n').concat(err.response.data[name].join('\n'))
        }
        console.log(str);
        return {
            error : str.slice(1),
        };
    })

}

export const logout = () => async dispatch => {
    return AuthAPI.logout()
    .then(res => {
        return dispatch({
            type : types.LOGOUT_AUTH,
        })
    })
    .catch(err => {
        //TODO: what??
        return dispatch({
            type : types.LOGOUT_AUTH,
        })
    })    
}

export const register = (email, pwd, first, last) => async dispatch => {
    return AuthAPI.register(email, pwd, first, last)
    .then(res => {
        return dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
        });
    })
    .catch(err => {
        var str = "";
        for (var name of Object.keys(err.response.data)) {
            str = str.concat('\n').concat(err.response.data[name].join('\n'))
        }
        console.log(str);
        return {
            error : str.slice(1),
        };
    })
}