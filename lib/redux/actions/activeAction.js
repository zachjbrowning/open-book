import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';
import { load_collection } from './collectionAction';


/*
    ACTIONS AND THEIR RELATED DISPATCH TYPES:
    (types found in ../types.js)
    - set_notebook : SET_BOOK_ACTIVE
    - unset_notebook : UNSET_BOOK_ACTIVE
    - set_note : SET_NOTE_ACTIVE
    - unset_note : UNSET_NOTE_ACTIVE
    - edit_note : EDIT_NOTE_ACTIVE
    - new_note : NEW_NOTE_ACTIVE
    - new_cat : NEW_CAT_ACTIVE
    - del_cat : DEL_CAT_ACTIVE

    for more information on state management refer to the frontend documentation (Frontend.md)
*/



// Set a notebook as the active notebook
export const set_notebook = (notebook, id) => async dispatch => {
    dispatch(unset_note())
    .then(res => {
        dispatch({
            type : types.SET_BOOK_ACTIVE,
            notebook : notebook,
        })
    })
}

// Remove a notebook as the active notebook
export const unset_notebook = () => async dispatch => {
    dispatch({
        type : types.UNSET_BOOK_ACTIVE,
    })
}

// Set a singular note as the active notebook
export const set_note = note => async dispatch => {
    dispatch({
        type : types.SET_NOTE_ACTIVE,
        note : note,
    })
}

// Remove a singular note as the active notebook
export const unset_note = () => async dispatch => {
    dispatch({
        type : types.UNSET_NOTE_ACTIVE,
    })
}

// Start editing a particular note
export const edit_note = note => async dispatch => {
    dispatch({
        type : types.EDIT_NOTE_ACTIVE,
        note : note,
    })
}

// Create a new ntoe
export const new_note = note => async dispatch => {
    dispatch({
        type : types.NEW_NOTE_ACTIVE,
        note : note,
    })
}

// Add a new category to note
export const new_cat = cat => async dispatch => {
    dispatch({
        type : types.NEW_CAT_ACTIVE,
        cat : cat,
    })
}

// Remove a category from note
export const del_cat = cat => async dispatch => {
    dispatch({
        type : types.DEL_CAT_ACTIVE,
        cat : cat,
    })
}