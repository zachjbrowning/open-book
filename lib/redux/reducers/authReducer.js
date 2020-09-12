import * as types from '../types';

// starting state of the component
const initialState = {
    email : false,
    first_name : false,
    last_name : false,
    token : false,
}

/*
    Each case in the reducer refers to a different dispatch type,
    specified in ../types.js

    For more information on state management read the frontend documentation (found
    in Frontend.md)
*/

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