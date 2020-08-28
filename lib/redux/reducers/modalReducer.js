import * as types from "../types";

const initialState = {
    title : false,
    content : false,
    func : () => true,
    warning : false,
};


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