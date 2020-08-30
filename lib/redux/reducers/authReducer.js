import * as types from '../types';

const initialState = {
    email : false,
    first_name : false,
    last_name : false,
    token : false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_AUTH:
            return {
                email : action.email,
                first_name : action.first_name,
                last_name : action.last_name,
                token : action.token,
            }
        case types.LOGOUT_AUTH:
            return {
                email : false,
                token : false,
            }
        default: 
            return state 
    }
}