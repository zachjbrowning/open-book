import * as types from "../types";

const initialState = {
    title : "",
    keywords : [],
    notes : "",
    loaded : false,
}


export const noteReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_NOTE:
            return { 
                loaded : true,
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
