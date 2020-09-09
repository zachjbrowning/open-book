import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import AuthAPI from '../../api/auth';
import { load_all } from './collectionAction';
import { Token } from '../../utils/localstorage';


export const login = (email, pwd) => async dispatch => {
    return AuthAPI.login(email, pwd)
    .then(res => {
        Token.setToken(res.data.token);
        return dispatch(load_all())
        .then(() => {
            dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
            });
            return { success : true,}
        })
    })
    .catch(err => {
        console.log(err);
        var str = "";
        if (err.response) {
            for (var name of Object.keys(err.response.data)) {
                str = str.concat('\n').concat(err.response.data[name].join('\n'))
            }
        } else str = "\nCouldn't connect to server";
        console.log(str);
        return {
            success : false,
            error : str.slice(1),
        };
    })

}

export const logout = () => async dispatch => {
    return AuthAPI.logout()
    .then(res => {
        Token.delToken();
        return dispatch({
            type : types.LOGOUT_AUTH,
        })
    })
    .catch(err => {
        //TODO: what??
        Token.delToken();
        return dispatch({
            type : types.LOGOUT_AUTH,
        })
    })    
}

export const register = (email, pwd, first, last) => async dispatch => {
    return AuthAPI.register(email, pwd, first, last)
    .then(res => {
        Token.setToken(res.data.token);
        return dispatch(load_all())
        .then(() => {
            dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
            });
            return { success : true,}
        })
    })
    .catch(err => {
        console.log(err);
        var str = "";
        if (err.response) {
            for (var name of Object.keys(err.response.data)) {
                str = str.concat('\n').concat(err.response.data[name].join('\n'))
            }
        } else str = "\nCouldn't connect to server";
        console.log(str);
        return {
            success : false,
            error : str.slice(1),
        };
    })
}


export const auto_login = () => async dispatch => {
    const token = Token.getToken();
    if (!token) return false;

    return AuthAPI.get()
    .then(res => {
        
        return dispatch(load_all())
        .then(() => {
            dispatch({
            type : types.LOGIN_AUTH,
            email : res.data.email,
            first_name : res.data.first_name,
            last_name : res.data.last_name,
            token : res.data.token,
            });
            return {success : true}
        })
        .catch(err => {return { success : false}})
    })
    .catch(err => {
        Token.delToken();
        return false;
    })
}