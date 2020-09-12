import * as types from "../types";

// starting state of the component
const initialState = {
    title : false,
    content : false,
    func : () => true,
    warning : false,
};

/*
    Each case in the reducer refers to a different dispatch type,
    specified in ../types.js

    For more information on state management read the frontend documentation (found
    in Frontend.md)
*/


export const modalReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.SET_MODAL:
            return {
                title : action.title,
                content : action.content,
                func : action.func,
                warning : action.warning,
            }
        case types.UNSET_MODAL:
            return {
                title : false,
                content : false,
                func : () => true,
                warning : false,
            }
        case types.SET_WARN_MODAL:
            return {
                ...state,
                warning : action.warning,
            }
        case types.UNSET_WARN_MODAL:
            return {
                ...state,
                warning : false,
            }
        default:
            return state
    }
}