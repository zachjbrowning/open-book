import * as types from "../types";

const initialState = {
    title : "",
    keywords : [],
    notes : "",
    state : false,
}


export const noteReducer = (state = initialState, action ) => {
    switch (action.type) {
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
                ...initialState
            }
        default:
            return state
    }
}
