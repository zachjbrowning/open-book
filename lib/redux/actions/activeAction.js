import * as types from '../types';
import regeneratorRuntime from "regenerator-runtime";
import store from '../store';


// if notebook was false here, we would load it I reckon (dispatch the set active first then load and dispatch something else)
export const set_notebook = notebook => async dispatch => {
    dispatch({
        type : types.SET_BOOK_ACTIVE,
        notebook : notebook,
    })
}

export const unset_notebook = () => async dispatch => {
    dispatch({
        type : types.UNSET_BOOK_ACTIVE,
    })
}

export const set_note = note => async dispatch => {
    dispatch({
        type : types.SET_NOTE_ACTIVE,
        note : note,
    })
}

export const unset_note = () => async dispatch => {
    dispatch({
        type : types.UNSET_NOTE_ACTIVE,
    })
}

export const edit_note = note => async dispatch => {
    dispatch({
        type : types.EDIT_NOTE_ACTIVE,
        note : note,
    })
}
