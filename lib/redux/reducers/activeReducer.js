import * as types from "../types";

// Starting state of the component
const initialState = {
    notebook : false,
    note : false,
    edit : false,
    new : false,
    popup : false,
}

/*
    Each case in the reducer refers to a different dispatch type,
    specified in ../types.js

    For more information on state management read the frontend documentation (found
    in Frontend.md)
*/

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
                popup : true,
            }
        case types.UNSET_NOTE_ACTIVE:
            return {
                ...state,
                note : false,
                edit : false,
                new : false,
                popup : false,
            }
        case types.EDIT_NOTE_ACTIVE:
            return {
                ...state,
                note : action.note,
                edit : true,
                popup : true,
            }
        case types.NEW_NOTE_ACTIVE:
            return {
                ...state,
                note : false,
                edit : true,
                new : [],
                popup : true,
            }
        case types.NEW_CAT_ACTIVE:
            if (state.new.indexOf(action.cat) === -1) {
                state.new.push(action.cat);
            };
            return {
                ...state,
            }
        case types.DEL_CAT_ACTIVE:
            let temp = [...state.new];
            if (temp.indexOf(action.cat) !== -1) temp.splice(temp.indexOf(action.cat), 1);
            return {
                ...state,
                new : temp,
            }
        default:
            return state
    }
}