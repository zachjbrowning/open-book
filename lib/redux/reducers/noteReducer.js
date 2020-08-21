import * as types from "../types";

const initialState = {
    title : "",
    keywords : [],
    notes : "",
    state : false,
}


export const noteReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.DELKEY_NOTE:
            let keyTemp = state.keywords;
            if (keyTemp.indexOf(action.key) !== -1) keyTemp.splice(keyTemp.indexOf(action.key), 1);
            return {
                ...state,
                keywords : keyTemp,
            }
        case types.ADDKEY_NOTE:
            keyTemp = state.keywords;
            if (keyTemp.indexOf(action.key) === -1) keyTemp.push(action.key);
            return {
                ...state,
                keywords : keyTemp,
            }
        case types.EDIT_NOTE:
            if (action.note) return {
                    state : "edit",
                    ...action.note
                };
            else return {
                ...state,
                state : "edit",
            }
        case types.LOAD_NOTE:
            return { 
                state : "view",
                ...action.note,
            }
        case types.CLEAR_NOTE:
            return {
                ...initialState,
                keywords : [],
            }
        default:
            return state
    }
}
