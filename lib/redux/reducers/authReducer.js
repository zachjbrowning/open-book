import * as types from '../types';

const initialState = {
    email : false,
    token : false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_AUTH:
            return {
                email : action.email,
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