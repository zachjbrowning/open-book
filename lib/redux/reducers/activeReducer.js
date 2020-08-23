import * as types from "../types";
import { bindActionCreators } from "redux";

const initialState = {
    notebook : "COMP3511",
    note : false,
    edit : false,
}


export const activeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_BOOK_ACTIVE:
            return {
                ...state,
                notebook : action.notebook,
            }
        case types.UNSET_BOOK_ACTIVE:
            return {
                ...initialState,
            }
        case types.SET_NOTE_ACTIVE:
            return {
                ...state,
                note : action.note,
                edit : false,
            }
        case types.UNSET_NOTE_ACTIVE:
            return {
                ...state,
                note : false,
                edit : false,
            }
        case types.EDIT_NOTE_ACTIVE:
            return {
                ...state,
                note : action.note,
                edit : true,
            }
        default:
            return state
    }
}